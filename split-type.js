(function (t, e) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = e();
  } else if (typeof define === "function" && define.amd) {
    define(e);
  } else {
    (t = typeof globalThis !== "undefined" ? globalThis : t || self).SplitType = e();
  }
})(this, function () {
  "use strict";

  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      let descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function createClass(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function extend(target, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      let source = sources[i] != null ? sources[i] : {};
      let keys = Object.keys(source);
      for (let j = 0; j < keys.length; j++) {
        let key = keys[j];
        defineProperty(target, key, source[key]);
      }
    }
    return target;
  }

  function arrayFrom(arrayLike, length) {
    return Array.from ? Array.from(arrayLike).slice(0, length) : [].slice.call(arrayLike, 0, length);
  }

  function toArray(iterable, length) {
    if (Array.isArray(iterable)) return iterable;
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iterable)) {
      return arrayFrom(iterable, length);
    }
    throw new TypeError("Invalid attempt to destructure non-iterable instance.");
  }

  function objectSpread(target, ...sources) {
    sources.forEach(source => {
      if (source) {
        let keys = Object.keys(source);
        keys.forEach(key => {
          target[key] = source[key];
        });
      }
    });
    return target;
  }

  function createElement(tag, attributes) {
    let element = document.createElement(tag);
    if (attributes) {
      Object.keys(attributes).forEach(attr => {
        let value = attributes[attr];
        if (value != null) {
          element.setAttribute(attr, value);
        }
      });
    }
    return element;
  }

  function SplitType(element, options) {
    this.element = element;
    this.settings = objectSpread({
      splitClass: "",
      lineClass: "line",
      wordClass: "word",
      charClass: "char",
      types: ["lines", "words", "chars"],
      absolute: false,
      tagName: "div"
    }, options);
    this.split();
  }

  SplitType.prototype.split = function () {
    let text = this.element.textContent.trim();
    let words = text.split(" ");
    let container = document.createDocumentFragment();

    words.forEach((word, index) => {
      let wordSpan = createElement(this.settings.tagName, {
        class: `${this.settings.wordClass} ${this.settings.splitClass}`
      });
      wordSpan.textContent = word;
      container.appendChild(wordSpan);
      if (index < words.length - 1) {
        container.appendChild(document.createTextNode(" "));
      }
    });

    this.element.innerHTML = "";
    this.element.appendChild(container);
  };

  return SplitType;
});
