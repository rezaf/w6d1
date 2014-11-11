var sum = function () {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(a, b) {
    return a + b;
  }, 0);
};

sum(1,2,3,4);



var myBind = function (context) {
  var that = this;
  var parentArgs = Array.prototype.slice.call(arguments, 1);
  return function () {
    var childArgs = Array.prototype.slice.call(arguments);
    return that.apply(context, parentArgs.concat(childArgs));
  }
}

Object.prototype.myBind = myBind;

var Cat = function(name) {
  this.name = name;
  this.meow = function () {
    console.log(this.name + " says meow!");
  }
};

testCat = new Cat('markov');
setTimeout(testCat.meow.myBind(testCat), 1000);



var curriedSum = function(numArgs) {
  var numbers = [];
  
  var _curriedSum = function(num) {
    numbers.push(num);
    var total = 0;
    
    if (numbers.length == numArgs) {
      numbers.forEach(function (num) {
        total += num;
      });
      return total;
    } else {
      return _curriedSum;
    }
  }
  
  return _curriedSum;
};


Function.prototype.curry = function(numArgs){
  var fn = this;
  var args = [];
  
  function fun(arg){
    args.push(arg);
    
    if (args.length === numArgs){
      return fn.apply(null, args);
    } else {
      return fun;
    }
  }
  
  return fun;
};

