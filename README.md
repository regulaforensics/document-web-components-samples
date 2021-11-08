# Table of сontents
1. [About](#about)
1. [NPM sample](#npm)
1. [CDN sample](#cdn)
1. [CodePen samples](#codepen)

---

<a name="about"></a>
## About

This repository contains examples of using [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components).

<a name="npm"></a>
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

1. ```<document-reader-wc></document-reader-wc>``` - for documents recognition.
1. ```<camera-snapshot-wc></camera-snapshot-wc>``` - to capture images from the camera and gallery.

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

<a name="cdn"></a>
## CDN sample

The ```cdn``` folder contains an example of using the component when connecting a package via a cdn link.

### Adding a package:

Connect the package to your ```.html``` file using the CDN link: ```unpkg.com/:package@:version/:file```

```html
<script src="https://unpkg.com/@regulaforensics/vp-frontend-document-components@0.0.1/dist/main.js"></script>
```

Add the name of the component to the html.

<a name="codepen"></a>
## CodePen samples

### Camera snapshot component

https://codepen.io/regulaforensics/pen/xxLjXBJ

### Document reader component

https://codepen.io/regulaforensics/pen/KKvRypq