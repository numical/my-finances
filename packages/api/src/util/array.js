const isScalarEqual = (a1, a2) => !a1.some((v, i) => v !== a2[i]);

module.exports = {
  isScalarEqual,
};
