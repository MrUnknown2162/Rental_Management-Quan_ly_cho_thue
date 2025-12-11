const validate = (() => {
  function isEmail(v) {
    return /\S+@\S+\.\S+/.test(v);
  }
  return { isEmail };
})();
