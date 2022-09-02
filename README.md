# Table of сontents
1. [About](#about)
1. [NPM sample](#npm-sample)
1. [CDN sample](#cdn-sample)
1. [CodePen samples](#codepen-samples)
1. [React typescript](#react-typescript)

---

## About

This repository contains examples of using [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components).

## NPM sample

The ```npm``` folder contains an example of using components when installing a package via NPM.

### Creating a new project:

Create a folder for your project and go to it:

```
cd /path/to/project
```

Init your project:

```
npm init
```
Answer the questions in the command line questionnaire.

Install [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components):

```
npm i @regulaforensics/vp-frontend-document-components
```

Create ```index.html``` and ```index.js``` files in the root directory of the project.

Import ```@regulaforensics/vp-frontend-document-components``` into your ```index.js```:

```javascript
import './node_modules/@regulaforensics/vp-frontend-document-components/dist/main.js';
```

In ```index.html``` connect ```index.js``` and add the name of the component you want to use. Available components:

1. ```<document-reader></document-reader>``` - for documents recognition.  
1. ```<camera-snapshot></camera-snapshot>``` - to capture images from the camera and gallery.

### Adding to an existing project:

Install package from NPM:

```
npm i @regulaforensics/vp-frontend-document-components
```

Import package into your ```.js``` file:

```javascript
import './node_modules/@regulaforensics/vp-frontend-document-components/dist/main.js';
```

Add the name of the component to your ```.html``` file. The list of components is given above.

## CDN sample

The ```cdn``` folder contains an example of using the component when connecting a package via a cdn link.

### Adding a package:

Connect the package to your ```.html``` file using the CDN link: ```unpkg.com/:package@:version/:file```

```html
<script src="https://unpkg.com/@regulaforensics/vp-frontend-document-components@1.2.0/dist/main.js"></script>
```

Add the name of the component to the html.

## React typescript

The ```react-ts``` folder contains an example of using a component with react and typescript.

### Example installation

Clone this repository then go to the ```react-ts``` folder and install the dependencies:

```
npm i
```

Build a project:

```
npm run build
```

The project files will be located in the ```build``` folder.

## CodePen samples

### Camera snapshot component

https://codepen.io/regulaforensics/pen/xxLjXBJ

### Document reader component

https://codepen.io/regulaforensics/pen/KKvRypq