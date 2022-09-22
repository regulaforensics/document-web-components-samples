# About

This repository contains examples of
using [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components)
. The library includes a UI component and SDK.

## Table of сontents

* [UI component](#ui-component)
    * [NPM sample](#npm-sample)
    * [CDN sample](#cdn-sample)
* [SDK](#SDK)
    * [DocumentReaderProcessor](#DocumentReaderProcessor)
* [CodePen samples](#codepen-samples)

---

# UI component

The UI component provides the fastest and easiest way to integrate Document reader into web applications.

## NPM sample

The ```ui/npm``` folder contains an example of using components when installing a package via NPM.

### How to integrate a component:

Install [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components):

```
npm i @regulaforensics/vp-frontend-document-components
```

Add the name of the component to your ```.html``` file:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>My app</title>
</head>
<body>

<document-reader start-screen></document-reader>
<!-- or -->
<camera-snapshot start-screen></camera-snapshot>

<script type="module" src="index.js"></script>
</body>
</html>
```

Prepare your ```.js``` file.

```document-reader``` example:

```javascript
import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents()
    .then(() => window.RegulaDocumentSDK.prepare())
```

***IMPORTANT***: The global variable in ```window``` should be called exactly ```RegulaDocumentSDK```.

```camera-snapshot``` example:

```javascript
import { defineComponents } from '@regulaforensics/vp-frontend-document-components';

defineComponents();
```

## CDN sample

The ```ui/cdn``` folder contains an example of using the component when connecting a package via a cdn link.

### How to integrate a component:

Connect the package to your ```.html``` file using the CDN link: ```unpkg.com/:package@:version/:file```

```html

<script src="https://unpkg.com/@regulaforensics/vp-frontend-document-components@1.2.0/dist/main.js"></script>
```

Add the component name to the ```.html``` and define the components.

```document-reader``` example:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>My app</title>
</head>
<body>

<document-reader start-screen></document-reader>

<script src="https://unpkg.com/@regulaforensics/vp-frontend-document-components@1.3.0/dist/main.js"></script>
<script>
    const {defineComponents, DocumentReaderService} = Regula;

    window.RegulaDocumentSDK = new DocumentReaderService();

    defineComponents()
            .then(() => window.RegulaDocumentSDK.prepare())
</script>
</body>
</html>
```

```camera-snapshot``` example:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>My app</title>
</head>
<body>

<camera-snapshot start-screen></camera-snapshot>

<script src="https://unpkg.com/@regulaforensics/vp-frontend-document-components@1.3.0/dist/main.js"></script>
<script>
    Regula.defineComponents();
</script>
</body>
</html>
```

# SDK

SDK is the best option for those who want to create their own interface.

## DocumentReaderProcessor

Install [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components):

```
npm i @regulaforensics/vp-frontend-document-components
```

```.html``` file:

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>My app</title>
</head>
<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #video {
        width: 700px;
        object-fit: cover;
        transform: scaleX(-1);
    }
</style>
<body>
<div class="container">
    <p id="status">Starting...</p>
    <video autoPlay playsInline id="video"></video>
</div>
<script type="module" src="./index.js"></script>
</body>
</html>
```

```.js``` file:

```javascript
import { DocumentReaderProcessor } from '@regulaforensics/vp-frontend-document-components';

const video = document.getElementById('video');
const status = document.getElementById('status');
const service = new DocumentReaderProcessor(video);

async function pageListener(currentPage) {
    status.textContent = 'Flip the document';

    setTimeout(async () => {
        status.textContent = 'In process.';
        await currentPage.startNextPage();
    }, 3000);
}

async function start() {
    try {
        status.textContent = 'Loading data...';
        await service.prepare();
        status.textContent = 'Initializing...';
        await service.initialize({license: 'LICENSE_KEY'});

        status.textContent = 'In process.';
        const result = await service.startRecognition(pageListener);

        status.textContent = 'Done! See the result in the console.';
        service.stopRecognition();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}

start();
```

## CodePen samples

### Camera snapshot component

https://codepen.io/regulaforensics/pen/xxLjXBJ

### Document reader component

https://codepen.io/regulaforensics/pen/KKvRypq