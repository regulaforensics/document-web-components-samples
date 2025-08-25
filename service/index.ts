import {
    DocumentReaderService,
    InternalScenarios,
    ProcessingStatus,
    Response,
    CheckResult,
    ImageQualityCheckType
} from '@regulaforensics/vp-frontend-document-components'

type FrameChecks = {
    glareCheck: CheckResult;
    resolutionCheck: CheckResult;
    focusCheck: CheckResult;
    isDocumentAvailable: boolean;
};

type RecognitionStatus = 'success' | 'timeout' | 'not finished' | 'new page available' | 'error';

const initService = async (): Promise<DocumentReaderService | null> => {
    try {
        const service = new DocumentReaderService();

        service.recognizerProcessParam = {
            processParam: {
                scenario: InternalScenarios.MrzAndLocate,
                returnUncroppedImage: true,
                multipageProcessing: true,
            },
        };

        // For DEV mode
        const initData = await service.initialize({license: 'YOUR_DEV_BASE64_LICENSE'});
        // For PRODUCTION mode:
        // const initData = await service.initialize();

        console.log('Init data:', initData);
        return service;
    } catch (error) {
        console.error('Failed to initialize service:', error);
        return null;
    }
};

const startVideo = async (): Promise<HTMLVideoElement | null> => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: {ideal: 1280},
                height: {ideal: 720},
            }
        });

        const videoElement = document.getElementById('video') as HTMLVideoElement;
        if (!videoElement) {
            console.error('Video element not found');
            return null;
        }

        videoElement.srcObject = stream;
        return new Promise((resolve) => {
            videoElement.addEventListener('loadeddata', () => resolve(videoElement), {once: true});
        });
    } catch (error) {
        console.error('Error accessing camera:', error);
        return null;
    }
};

const getImageFromVideo = (videoElement: HTMLVideoElement): ImageData[] => {
    const {videoHeight, videoWidth} = videoElement;
    const canvas = document.createElement('canvas');

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) {
        console.error('Failed to get canvas context');
        return [];
    }

    ctx.drawImage(videoElement, 0, 0);
    const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
    return [imageData];
};

const getStatus = (response: Response, multipageProcessing: boolean): RecognitionStatus => {
    const rawResponse = response.rawResponse;

    if (rawResponse.ProcessingFinished === ProcessingStatus.FINISHED) {
        const isFinalPage = !multipageProcessing ||
            (multipageProcessing && rawResponse.morePagesAvailable === 0);

        return isFinalPage ? 'success' : 'new page available';
    }

    switch (rawResponse.ProcessingFinished) {
        case ProcessingStatus.TIMEOUT:
            return 'timeout';
        case ProcessingStatus.NOT_FINISHED:
            return 'not finished';
        default:
            return 'error';
    }
};

/**
 * Function for getting hints for users.
 *
 * @param {object} response - The result of frame processing.
 * @param {number} pageIdx - document page index (0 - for first page, 1 - for second).
 */
function getChecks(response: Response, pageIdx: number): FrameChecks {
    const checks = { // checks for each frame
        /**
         * WAS_NOT_DONE - the check was not carried out
         * OK - the check is ok
         * ERROR - the check failed according to the specified parameters
         * isDocumentAvailable - a document was found in the frame
         */
        glareCheck: CheckResult.WAS_NOT_DONE,
        resolutionCheck: CheckResult.WAS_NOT_DONE,
        focusCheck: CheckResult.WAS_NOT_DONE,
        isDocumentAvailable: false,
    };

    response.rawResponse?.ContainerList?.List.forEach((list) => {
        if (list.page_idx === pageIdx) {
            if ('ImageQualityCheckList' in list) {
                list.ImageQualityCheckList.List.forEach((check) => {
                    if (check.result !== undefined) {
                        if (check.type === ImageQualityCheckType.ImageFocus) {
                            checks.focusCheck = check.result;
                        }
                        if (check.type === ImageQualityCheckType.ImageGlares) {
                            checks.glareCheck = check.result;
                        }
                        if (check.type === ImageQualityCheckType.ImageResolution) {
                            checks.resolutionCheck = check.result;
                        }
                    }
                });
            }
            if ('DocumentPosition' in list) {
                checks.isDocumentAvailable = true;
            }
        }
    });

    return checks;
}

const delayExecution = (delay: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, delay));
};

const startRecognition = async () => {
    const service = await initService();

    if (!service || !service.initData?.license.status) {
        console.error('Service initialization failed or bad license');
        return;
    }

    const videoElement = await startVideo();

    if (!videoElement) {
        console.error('Failed to start video');
        return;
    }

    try {
        const transactionData = await service.startNewDocument();
        console.log('Transaction info:', transactionData);

        let status: RecognitionStatus = 'not finished';
        let res: Response | null = null;
        let pageIdx = 0;

        while (status !== 'timeout' && status !== 'success' && videoElement) {
            const imageData = getImageFromVideo(videoElement);
            res = await service.process(imageData);
            status = getStatus(res, !!service.recognizerProcessParam.processParam.multipageProcessing);
            const checks = getChecks(res, pageIdx); // frame quality checks
            console.log('Frame status:', status);
            console.log('Frame checks:', checks);

            if (status === 'new page available') {
                console.log('Page result:', res);
                console.log('Show next page in 3 seconds');
                pageIdx++;
                await delayExecution(3000);
                await service.startNewPage();
            }
        }
        console.log('Recognition result:', res);
        console.log('Recognition status:', status);
    } catch (error) {
        console.error('Recognition error:', error);
    }
}

startRecognition();
