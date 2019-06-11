var inherit = (function() {
  var F = function(){};
  return function(C,P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    c.uber = P.prototype;
    c.prototype.constructor = C;
  }
})();