const { timingSafeEqual } = require('crypto');

const isEqualInFixedTime = (s1, s2) => {
  const b1 = Buffer.from(s1);
  const b2 = Buffer.from(s2);
  return b1.length === b2.length
    ? timingSafeEqual(b1, b2)
    : !timingSafeEqual(b1, b1);
};

const reverse = (s) => s.split('').reverse().join('');

module.exports = {
  isEqualInFixedTime,
  reverse,
};
