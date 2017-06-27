const getClass = indexClass => document.getElementsByClassName(indexClass);
const getId = indexId => document.getElementById(indexId);
const getMargin = (element, margin) => Number(window.getComputedStyle(element).getPropertyValue(margin).match(/\d+/)[0]);

const sliderItems = getClass('slider__item');
const sliderLength = sliderItems.length;
const sliderImg = getClass('slider__img')[0];

const slideWidth = sliderImg.width + getMargin(sliderImg, 'margin-left') + getMargin(sliderImg, 'margin-right');

const insert = (first, last) => getId('slider__body').insertBefore(first, last);

let margin = 0;

const sliderAnimate = (speed = 15, delay = 0) => {
  if (margin > -slideWidth) {
    margin -= 1;
    sliderItems[0].style.marginLeft = String(margin) + 'px';
    setTimeout(() => sliderAnimate(speed, delay), speed);
  } else if (margin === -slideWidth) {
    sliderItems[0].style.marginLeft = '0px';
    insert(sliderItems[0], sliderItems[sliderLength + 1]);
    margin = 0;
    setTimeout(() => sliderAnimate(speed, delay), delay);
  }
};

sliderAnimate();
