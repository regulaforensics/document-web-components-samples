import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';
import {
    DocumentReaderApi,
    GraphicFieldType,
    Configuration,
    Scenario
} from '@regulaforensics/document-reader-webclient';

const container = document.querySelector('#container');
const configuration = new Configuration({ basePath: 'https://test-api.regulaforensics.com' });
const api = new DocumentReaderApi(configuration);

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents().then(() => window.RegulaDocumentSDK.initialize());
// To use the document-reader component on test environments, you have to set the base64 license
// defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

function createElement({ el, target, text, id }) {
    const element = document.createElement(el);
    if (text) element.textContent = text;
    if (id) element.id = id;
    target.append(element);
    return element;
}

function openButtonHandler(event) {
    if (event.target.id !== 'button') return;
    container.innerHTML = '';
    const documentReader = createElement({ el: 'document-reader', target: container });

    documentReader.settings = {
        startScreen: true,
        changeCameraButton: true,
    };
}

async function documentReaderListener(data) {
    if (data.detail.action === 'PROCESS_FINISHED') {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1 || status === 2;

        if (!isFinishStatus || !data.detail.data?.response) return;
        data.target.remove();
        const spinner = createElement({ el: 'div', target: container, id: 'spinner' });
        const componentResponse = data.detail.data.response;
        const imageField = componentResponse.images.getField(GraphicFieldType.DOCUMENT_FRONT);
        const documentFront = imageField.valueList[1].value;
        const processParam = {
            images: [ documentFront ],
            processParam: {
                scenario: Scenario.FULL_PROCESS,
            }
        }

        const result = await api.process(processParam);

        spinner.remove();
        createElement({ el: 'button', target: container, text: 'Try again', id: 'button' });
        createElement({ el: 'p', target: container, text: 'The result in the console ↓' });
        console.log('Result', result);
    }
    if (data.detail?.action === 'CLOSE') {
        data.target.remove();
        createElement({ element: 'button', target: container, text: 'Open document reader', id: 'button' });
    }
}

container.addEventListener('document-reader', documentReaderListener);
container.addEventListener('click', openButtonHandler);
