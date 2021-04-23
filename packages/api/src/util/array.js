const isScalarEqual = (a1, a2) => !a1.some((v, i) => v !== a2[i]);

const chunk = (size, a) =>
  a.length > size
    ? [a.slice(0, size), ...chunkArray(a.slice(size), size)]
    : [a];

module.exports = {
  chunk,
  isScalarEqual,
};
