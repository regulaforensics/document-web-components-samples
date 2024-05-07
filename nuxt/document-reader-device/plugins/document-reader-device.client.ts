import { defineComponents } from '@regulaforensics/vp-frontend-document-components';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            defineComponents,
        }
    }
})
