import { setTimeout } from "timers";

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

export function throttle(fn, threshold) {
  let timeout;
  let start = new Date();
  threshold = threshold || 160;
  return function() {
    let context = this;
    let args = arguments;
    let curr = new Date() - 0;

    clearTimeout(timeout); //总是干掉事件回调
    if (curr - start >= threshold) {
      fn.apply(context, args);
      start = curr;
    } else {
      // 让方法在脱离事件后也能执行一次
      timeout = setTimeout(function() {
        fn.apply(context, args)
      }, threshold);
    }
  }
}

export function debounce(fn, delay) {
  let timeout;
  delay = delay || 100;
  return function() {
    clearTimeout(timeout);
    let context = this;
    let args = arguments;
    setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}
