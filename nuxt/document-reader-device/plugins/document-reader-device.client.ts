import { defineComponents } from '@regulaforensics/vp-frontend-document-components-beta';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            defineComponents,
        }
    }
})
