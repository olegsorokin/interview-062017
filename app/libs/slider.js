const getClass = indexClass => document.getElementsByClassName(indexClass);
const getId = indexId => document.getElementById(indexId);

const sliderItems = getClass('slider__item');
const sliderLength = sliderItems.length;

const outerWidth = (el) => {
  let width = el.offsetWidth;
  const style = getComputedStyle(el);

  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
};

const slideWidth = outerWidth(getClass('slider__img')[0]);

const insert = (first, last) => getId('slider__body').insertBefore(first, last);

let margin = 0;

const sliderAnimate = (speed = 15, delay = 0) => {
  if (margin > -slideWidth) {
    margin -= 1;
    sliderItems[0].style.marginLeft = String(margin) + 'px';
    setTimeout(() => sliderAnimate(speed, delay), speed);
  } else if (margin <= -slideWidth) {
    sliderItems[0].style.marginLeft = '0px';
    insert(sliderItems[0], sliderItems[sliderLength + 1]);
    margin = 0;
    setTimeout(() => sliderAnimate(speed, delay), delay);
  }
};

sliderAnimate();
