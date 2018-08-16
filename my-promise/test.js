const MyPromise = require('./my_promise');
const { performance } = require('perf_hooks');

var aPromise= new MyPromise(resolve => {
  setTimeout(() => {
    resolve(100)
  }, 3000);
}).then(res => {
  console.log('Current time: ' + performance.now());
  console.log(res);
  return new MyPromise(resolve => {
    setTimeout(() => {
      resolve(res + 1);
    }, 1000);
  });
});

setTimeout(() => {
  console.log('Current time: ' + performance.now());
  aPromise.then(res => console.log(res));
}, 4000);