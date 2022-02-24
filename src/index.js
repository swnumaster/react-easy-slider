import React, { useState, useRef } from 'react';
import './static/css/style.css';
import image from './static/images/image.svg'   // should import image.svg first to use it in this component
import { getMousePos, initMagnifier, moveMagnifier, exitMagnifier } from './utils';
import ChueasyPreviewer from './previewer';

const ReactEasySlider = (props) => {
    
    const [ state, setState ] = useState({
        imageIndex: 0,
        displayPreviewer: false,
    });
    const { imageList } = props;
    const wrapperRef = useRef(null);
    const magnifierRef = useRef(null);

    // default value
    let magShape = "square";    // square|rectangle|circle
    let magScale = 0.4;
    let imgScale = 2.0;

    // set value
    if (props.magScale && props.magScale > 0 && props.magScale < 1)
        magScale = props.magScale;
    if (props.imgScale && props.imgScale > 1 && props.imgScale < 10)
        imgScale = props.imgScale;
    if (props.magShape)
        magShape = props.magShape;
    
    const addImageIndex = (isAdd = true) => {
        setState((preState) => {
            let newState = Object.assign({}, preState);
            if (isAdd) {
                if (newState.imageIndex < imageList.length - 1) newState.imageIndex += 1;
            } else {
                if (newState.imageIndex > 0) newState.imageIndex -= 1;     
            }
            return newState;
        });
    }

    const setImageIndex = (index) => {
        setState((preState) => {
            let newState = Object.assign({}, preState);
            newState.imageIndex = index;
            return newState;
        });
    }

    let isTouchMode = false;

    const onMouseOver = (e) => {
        if (isTouchMode) return;
        initMagnifier(wrapperRef.current, magnifierRef.current, magScale, magShape);
        moveMagnifier(wrapperRef.current, magnifierRef.current, getMousePos(e), imgScale);
    }

    const onMouseOut = (e) => {
        exitMagnifier(magnifierRef.current);
    }

    const onMouseMove = (e) => {
        moveMagnifier(wrapperRef.current, magnifierRef.current, getMousePos(e), imgScale);
    }

    const onTouchStart = (e) => {
        isTouchMode = true;
    }

    // for supporting image previewer. 20210710
    const setDisplayPreviewer = (enable) => {
        setState((preState) => {
            let newState = Object.assign({}, preState);
            newState.displayPreviewer = enable;
            return newState;
        });
    }    
    const onOpenPreviewer = (e) => {
        setDisplayPreviewer(true);
    }

    const onClosePreviewer = () => {
        setDisplayPreviewer(false);
    }
    //

    if (imageList.length === 0) {
        return (
            <div className="chueasy-no-image-wrapper">
                <img src={image} />
            </div>
        );
    }

    const imageIndex = state.imageIndex;

    return (
        <React.Fragment>
        <div className="chueasy-slider-wrapper">
            <div className="s-content">
                <div ref={wrapperRef} className="chueasy-slider-image-wrapper-v2">
                    <img src={imageList[imageIndex].url} 
                        onMouseOver={ (e) => onMouseOver(e) }
                        onMouseOut={ (e) => onMouseOut(e) }
                        onMouseMove={ (e) => onMouseMove(e) }
                        onTouchStart={ (e) => onTouchStart(e) }
                        onClick={ (e) => onOpenPreviewer(e) }
                    />
                    {imageIndex > 0 && <div className="left-arrow" onClick={ () => addImageIndex(false) }></div>}
                    {imageIndex < imageList.length - 1 && <div className="right-arrow" onClick={ () => addImageIndex() }></div>}
                    <div ref={magnifierRef} className="chueasy-magnifier-wrapper">
                        <img src={imageList[imageIndex].url}/>
                    </div>
                </div>
            </div>
            <div className="s-nav">
                {
                    imageList.map( (image, index) => {
                        const style = index === imageIndex ? "s-menu-image s-selected" : "s-menu-image";
                        return (
                            <div key={index} className="s-menu">
                                <img className={style} src={image.url} onClick={ () => setImageIndex(index) } />
                            </div>
                        );
                    })
                }
            </div>
        </div>
        { state.displayPreviewer && <ChueasyPreviewer imageList={imageList} defaultIndex={state.imageIndex} onClose={() => onClosePreviewer()}/>}
        </React.Fragment>
    );
}

export default ReactEasySlider;

