import React from 'react';
import { render } from 'react-dom';
import ReactEasySlider from '../src';

// 仅做演示作用的配置数据
var imgUrl1 = require('../src/static/images/slide1.jpg');    // 模块化方式引用图片路径，这样引用的图片才可以打包进dist文件夹
var imgUrl2 = require('../src/static/images/slide2.jpg');
var imgUrl3 = require('../src/static/images/slide3.jpg');

let imageList = [
    {url: imgUrl1},
    {url: imgUrl2},
    {url: imgUrl3},
    {url: imgUrl1},
    {url: imgUrl2},
    {url: imgUrl3},
    {url: imgUrl1},
    {url: imgUrl2},
    {url: imgUrl3}
];
//

var packageJson = require('../package.json');

const App = () => (
    <React.Fragment>
        <div className="chueasy-header-wrapper">
            <h2>{packageJson.description} (V{packageJson.version})</h2>
            <p>Author: {packageJson.author}</p>
            <p>Email: {packageJson.email}</p>
        </div>
        <ReactEasySlider imageList={imageList} />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));