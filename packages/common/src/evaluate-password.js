const DIGITS = /\d/g;
const LOWERCASE = /[a-z]/g;
const UPPERCASE = /[A-Z]/g;
const SYMBOLS = /[^a-zA-Z0-9]/g;

const score = (pwd) => {
  if (!pwd) return 0;

  // length
  let score = pwd.length;

  // types
  const counts = {
    digits: (pwd.match(DIGITS) || []).length,
    lowercase: (pwd.match(LOWERCASE) || []).length,
    uppercase: (pwd.match(UPPERCASE) || []).length,
    symbol: (pwd.match(SYMBOLS) || []).length,
  };
  Object.values(counts).forEach((count) => {
    if (count > 0) {
      score += 3;
    }
    if (count > 1) {
      score += 2;
    }
  });

  return score;
};

const passes = (pwd, target = 30) => score(pwd, target) >= target;

module.exports = {
  passes,
  score,
};
