# awesome-code-snippet
一些比较实用的代码段

## JS

### 覆盖默认选项

收集自[https://github.com/mfncooper/mockery/blob/master/mockery.js](https://github.com/mfncooper/mockery/blob/master/mockery.js)

```javascript
/*
 * Merge the supplied options in with a new copy of the default options to get
 * the effective options, and return those.
 */
function getEffectiveOptions(opts) {
    var options = {};

    Object.keys(defaultOptions).forEach(function (key) {
        options[key] = defaultOptions[key];
    });
    if (opts) {
        Object.keys(opts).forEach(function (key) {
            options[key] = opts[key];
        });
    }
    return options;
}
```

### 定义全局模块，兼容AMD/CMD

```javascript
;(function (root, factory) {
  'use strict'

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else {
    root.Thenjs = factory()
  }
}(typeof window === 'object' ? window : this, function () {
    'use strict'

    function FunctionClass(){}
    return FunctionClass
})
```

### 及早求值
收集自[https://github.com/dionyziz/stream.js/blob/master/src/stream.js](https://github.com/dionyziz/stream.js/blob/master/src/stream.js)

```javascript
function Eager(func) {
    this.func = func;
}

Eager.prototype = {
    eval: function() {
        return this.func();
    }
}

// 如何使用
function sum(){
    return 1 + 1
}
var swapper = new Eager(sum).eval() // swapper的值为2
```

### 延迟求值（Lazy）

收集自[https://github.com/dionyziz/stream.js/blob/master/src/stream.js](https://github.com/dionyziz/stream.js/blob/master/src/stream.js)

常用于尾递归

```javascript
function Lazy(func) {
    this.has_evaluated = false;
    this.func = func;
    this.value = null;
}

Lazy.prototype = {
    eval: function() {
        if ( this.has_evaluated ) {
            return this.value;
        }

        this.value = this.func();
        this.has_evaluated = true;
        return this.value;
    }
};

// 如何使用
function sum(){
    return 1 + 1
}
var swapper = new Lazy(sum).eval() // swapper为一个Lazy对象
```








