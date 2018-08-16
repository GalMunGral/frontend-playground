class MyPromise {
  constructor(execute) {
    this.value = null;
    this.resolved = false;
    this.callback = null;
    this.resolve = this.resolve.bind(this);
    if (execute) execute(this.resolve);
  }
  
  // Could be evoked directly
  resolve(val) {
    this.value = val;
    this.resolved = true;
    if (this.callback) {
      this.callback(val);
    }
  }

  then(func) {
    if (!this.resolved) {
      // Create a new promise for the result of callback
      const nextPromise = new MyPromise();
      this.callback = (val) => {
        // Evaluate the callback once current value is resolved
        const result = func(val);
        // Pipe the value to next promise 
        if (result instanceof MyPromise) {
          result.then(val => nextPromise.resolve(val));
        } else {
          nextPromise.resolve(result);
        }
      }
      return nextPromise;
    } else {
      // If already resolved, execute callback immediately
      result = func(this.val);
      if (result instanceof MyPromise) {
        return result;
      } else {
        return new MyPromise(resolve => resolve(result));
      }
    }
  }
}

module.exports = MyPromise