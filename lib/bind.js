Function.prototype.bind = function(context) {
  var args = Array.prototype.slice.apply(arguments, 1);
  var selfFunc = this;
  var F = function() {};
  var bound = function() {
    return selfFunc.apply(this instanceof F? this: context, args.concat(Array.prototype.slice.apply(arguments)));
  }
  if(this.prototype) {
    F.prototype = this.prototype;
  }
  bound.prototype = new F();
  return bound;
}