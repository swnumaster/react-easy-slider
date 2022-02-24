# Introduction

    This is a React component by which you can realize an image slider quickly.
    Demo: https://swnumaster.github.io/react-easy-slider/
    Author: Nathan Jiang (373578963@qq.com)

# Installation

    npm install react-easy-slider

# Usage
<pre>
    <code>
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
    </code>
</pre>