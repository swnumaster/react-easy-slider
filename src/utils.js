// Get absolute oordinate relative to the page
// Even scrolling cannot changes the position
export const getTouchPos = (event) => {

    return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
    };
}

export const getMousePos = (event) => {

    var posX = 0, posY = 0;
    var e = event || window.event;  // 标准化事件对象
    if (e.pageX && e.pageY) {
        posX = e.pageX;
        posY = e.pageY;
    } else if (e.clientX && e.clientY) {
        posX = e.clientX;
        posY = e.clientY;
    }

    return {
        x: posX,
        y: posY
    };
}

// Get scrollLeft and scrollTop
const getScroll = () => {

    var scrollLeft = window.pageXOffset  // Firefox
                || document.documentElement.scrollLeft  // Page has set DOCTYPE (DTD)
                || document.body.scrollLeft
                || 0;
    var scrollTop = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;

    return {
        x: scrollLeft,
        y: scrollTop
    }
}

// Get absolute oordinate relative to the page
const getRect = (e) => {

    let rect = e.getBoundingClientRect();

    return {
        x: rect.left + getScroll().x,
        y: rect.top + getScroll().y,
        w: rect.width,
        h: rect.height
    };
}

const handleMagnifiedImage = (wrapperEl, magnifierEl, offset, imgScale) => {

    let wrapperRect = getRect(wrapperEl);
    let magifierRect = getRect(magnifierEl);
    let imageEl = magnifierEl.firstChild;

    let imageWidth = wrapperRect.w * imgScale;
    let imageHeight = wrapperRect.h * imgScale;
    
    imageEl.style.width = imageWidth + "px";
    imageEl.style.height = imageHeight + "px";

    // must be sure magifier is smaller than wrapper
    let magnifiexFullOffsetX = wrapperRect.w - magifierRect.w;
    let imageFullOffsetX = imageWidth - magifierRect.w;
    let ratioX = imageFullOffsetX / magnifiexFullOffsetX;

    let magnifiexFullOffsetY = wrapperRect.h - magifierRect.h;
    let imageFullOffsetY = imageHeight - magifierRect.h;
    let ratioY = imageFullOffsetY / magnifiexFullOffsetY;

    imageEl.style.transform = "translate3d(-" + offset.left * ratioX + "px,-" + offset.top * ratioY + "px,0)";
}

// init magnifier
export const initMagnifier = (wrapperEl, magnifierEl, magSacle, magShape) => {

    let wrapperRect = getRect(wrapperEl);

    let magW = 0;
    let magH = 0;
    if (magShape === "square") {
        let min = Math.min(wrapperRect.w, wrapperRect.h);
        magW = magH = min * magSacle;
    } else {
        magW = wrapperRect.w * magSacle;
        magH = wrapperRect.h * magSacle;
    }

    magnifierEl.style.display = "block";
    magnifierEl.style.width = magW + "px";
    magnifierEl.style.height = magH + "px";
}

// exit magnifier
export const exitMagnifier = (magnifierEl) => {

    magnifierEl.style.display = "none";
}

// Move the magnifier element
export const moveMagnifier = (wrapperEl, magnifierEl, mousePos, imgScale) => {

    let magnifierRect = getRect(magnifierEl);
    let wrapperRect = getRect(wrapperEl);

    let offsetX = - magnifierRect.w / 2;
    let offsetY = - magnifierRect.h / 2;

    let left = mousePos.x - wrapperRect.x + offsetX;
    let top = mousePos.y - wrapperRect.y + offsetY;
    
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    
    if (left > (wrapperRect.w - magnifierRect.w)) left = wrapperRect.w - magnifierRect.w;
    if (top > (wrapperRect.h - magnifierRect.h)) top = wrapperRect.h - magnifierRect.h;

    
    magnifierEl.style.left = left + "px";
    magnifierEl.style.top = top + "px";

    handleMagnifiedImage(wrapperEl, magnifierEl, {left, top}, imgScale);
}

export const outputRectInfo = (e) => {

    console.log("(offsetTop offsetLeft offsetHeight, offsetWidth)", e.offsetTop, e.offsetLeft, e.offsetHeight, e.offsetWidth);
    console.log("(clientHeight, clientWidth)", e.clientHeight, e.clientWidth);
    console.log("(scrollTop, scrollLeft, scrollHeight, scrollWidth)", e.scrollTop, e.scrollLeft, e.scrollHeight, e.scrollWidth);
    console.log("(pageX pageY)", e.pageX, e.pageY);
    console.log("(clientX clientY)", e.clientX, e.clientY);
    console.log("(offsetX offsetY)", e.offsetX, e.offsetY);
    console.log("(style.top style.left)", e.style.top, e.style.left);
    console.log("(style.height style.width)", e.style.height, e.style.width);
}