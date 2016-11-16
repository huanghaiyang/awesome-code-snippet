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





