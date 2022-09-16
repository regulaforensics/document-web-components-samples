# Table of сontents
1. [About](#about)
1. [CDN sample](#cdn-sample)
1. [Webpack sample](#webpack-sample)
1. [React typescript](#react-typescript)
1. [CodePen samples](#codepen-samples)

---

## About

This repository contains examples of using [@regulaforensics/vp-frontend-document-components](https://www.npmjs.com/package/@regulaforensics/vp-frontend-document-components).

## CDN sample

The ```cdn``` folder contains an example of using the component when connecting a package via a cdn link.

### Adding a package:

Connect the package to your ```.html``` file using the CDN link: ```unpkg.com/:package@:version/:file```

```html
<!-- Replace <VERSION> with the package version -->
<script src="https://unpkg.com/@regulaforensics/vp-frontend-document-components@<VERSION>/dist/main.js"></script>
```

Add the name of the component tag to the html code.

## Webpack sample

The ```webpack``` folder contains an example of using components with Webpack.

### Example installation

Clone this repository then go to the ```webpack/<component-name>``` folder and install the dependencies:

```
npm i
```

Build a project:

```
npm run build
```

The project files will be located in the ```build``` folder.

## React typescript

The ```react-ts/<component-name>``` folder contains an example of using a component with react and typescript.

### Example installation

Follow the steps as in [Webpack sample](#webpack-sample).

## CodePen samples

### Camera snapshot component

https://codepen.io/regulaforensics/pen/xxLjXBJ

### Document reader component

https://codepen.io/regulaforensics/pen/KKvRypq