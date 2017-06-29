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

### map映射的promise写法
```javascript
const arr = [1, 2, 3, 4];
const result = await Promise.all(arr.map(item => {
    return new Promise(async (reslove, reject) => {
        try{
          reslove(await fetch(item));
        }catch(error){
          reject(error);
        }
      });
    }));
```

### loopAsync
收集自[https://github.com/ReactTraining/react-router/blob/v3.0.0/modules/AsyncUtils.js](https://github.com/ReactTraining/react-router/blob/v3.0.0/modules/AsyncUtils.js)

```javascript
function loopAsync(turns, work, callback) {
  var currentTurn = 0,
      isDone = false;
  var sync = false,
      hasNext = false,
      doneArgs = void 0;

  function done() {
    isDone = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      doneArgs = [].concat(Array.prototype.slice.call(arguments));
      return;
    }

    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) {
      return;
    }

    hasNext = true;
    if (sync) {
      // Iterate instead of recursing if possible.
      return;
    }

    sync = true;

    while (!isDone && currentTurn < turns && hasNext) {
      hasNext = false;
      work.call(this, currentTurn++, next, done);
    }

    sync = false;

    if (isDone) {
      // This means the loop finished synchronously.
      callback.apply(this, doneArgs);
      return;
    }

    if (currentTurn >= turns && hasNext) {
      isDone = true;
      callback();
    }
  }

  next();
}
```

### mapAsync
收集自[https://github.com/ReactTraining/react-router/blob/v3.0.0/modules/AsyncUtils.js](https://github.com/ReactTraining/react-router/blob/v3.0.0/modules/AsyncUtils.js)

```javascript
function mapAsync(array, work, callback) {
  var length = array.length;
  var values = [];

  if (length === 0) return callback(null, values);

  var isDone = false,
      doneCount = 0;

  function done(index, error, value) {
    if (isDone) return;

    if (error) {
      isDone = true;
      callback(error);
    } else {
      values[index] = value;

      isDone = ++doneCount === length;

      if (isDone) callback(null, values);
    }
  }

  array.forEach(function (item, index) {
    work(item, index, function (error, value) {
      done(index, error, value);
    });
  });
}
```






