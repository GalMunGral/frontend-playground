const { performance } = require('perf_hooks');

class MyPromise {
  constructor(executor) {
    this.value = null;
    this.resolved = false;
    this.callback = null;
    this.resolve = this.resolve.bind(this);
    if (executor) executor(this.resolve);
  }
  
  resolve(val) {
    this.value = val;
    this.resovled = true;
    if (this.callback) {
      this.callback(val);
    }
  }

  then(func) {
    if (!this.resolved) {
      const nextPromise = new MyPromise();
      this.callback = (val) => {
        const result = func(val);
        if (result instanceof MyPromise) {
          result.then(val => nextPromise.resolve(val));
        } else {
          nextPromise.resolve(result);
        }
      }
      return nextPromise;
    } else {
      result = func(this.val);
      if (result instanceof MyPromise) {
        return result;
      } else {
        return new Promise((resolve) => {
          resolve(result);
        });
      }
    }
  }

}

var start = performance.now();
function getTime() {
  return parseInt((performance.now() - start) / 1000);
}
a = new MyPromise(resolve => {
  setTimeout(() => {
    resolve(100)
  }, 3000);
}).then(res => {
  return new MyPromise(resolve => {
    console.log(res);
    start = performance.now();
    setTimeout(() => {
      console.log(`Time Elapsed: ${getTime()}`);
      resolve(res + 1);
    }, 2000);
  });
}).then(res => {
  return new MyPromise(resolve => {
    console.log(res);
    start = performance.now();
    setTimeout(() => {
      console.log(`Time Elapsed: ${getTime()}`);
      resolve(res + 1);
    }, 2000);
  });
});
