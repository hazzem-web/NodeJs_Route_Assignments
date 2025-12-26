/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    originalvalue = init
    return { 
        increment : function() { 
            init++;
            return init;
        },
        decrement : ()=>{
            init--;
            return init;
        },
        reset : ()=> {
            init = originalvalue;
            return init;
        }
    }
};


  const counter = createCounter(5)
  
  console.log( counter.increment()); // 6
  console.log( counter.reset() ); // 5
  console.log( counter.decrement() ); // 4