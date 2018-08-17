WebAssembly.instantiateStreaming(fetch('test.wasm'), {})
  .then(result => {
    console.log(result)
    const f = result.instance.exports.addFive;
    console.log(f(1));
  })