const isScalarEqual = (a1, a2) => !a1.some((v, index) => v !== a2[index]);

const chunk = (size, a) =>
  a.length > size ? [a.slice(0, size), ...chunk(a.slice(size), size)] : [a];

module.exports = {
  chunk,
  isScalarEqual,
};
