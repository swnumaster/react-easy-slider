# Introduction

    This is a React component by which you can realize an image slider quickly.
    Demo: https://swnumaster.github.io/react-easy-slider/
    Author: Nathan Jiang (373578963@qq.com)

# Installation

    npm install react-easy-slider

# Usage
```javascript
import React from 'react';
import { render } from 'react-dom';
import ReactEasySlider from 'react-easy-slider';

let imageList = [
    {url: "https://www.fb.com/slide1.jpg"},
    {url: "https://www.fb.com/slide2.jpg"},
    {url: "https://www.fb.com/slide3.jpg"}
];

const MyComponent = () => (
    <ReactEasySlider imageList={imageList} />
);

render(<MyComponent />, document.getElementById(node));
```

# Change log

    v1.0.5

        change webpack4 to webpack5 and remove url-loader, file-loader, svg-url-loader
        upgrade other packages for development

    v1.0.4      

        ignore unecessary files

    v1.0.3      

        modify README.md and add README-for-developers.md