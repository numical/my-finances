import { test } from 'tap';
import { passes, score } from '../src/index.mjs';

const scenarios = [
  { pwd: '', expectedScore: 0 },
  { pwd: 'password', expectedScore: 13 },
  { pwd: 'PASSWORD', expectedScore: 13 },
  { pwd: 'PASSW0RD', expectedScore: 16 },
  { pwd: 'PA55W0RD', expectedScore: 18 },
  { pwd: 'pA55W0RD', expectedScore: 21 },
  { pwd: 'pa55W0RD', expectedScore: 23 },
  { pwd: 'pa55W0RD!', expectedScore: 27 },
  { pwd: '%pa55W0RD!', expectedScore: 30 },
];

scenarios.forEach(({ pwd, expectedScore }) => {
  const name = `pwd '${pwd} should score ${expectedScore}`;
  test(name, (t) => {
    const actualScore = score(pwd);
    t.equal(actualScore, expectedScore, `${name}, actually ${actualScore}`);
    t.end();
  });
});

scenarios.forEach(({ pwd, expectedScore }) => {
  test(`pwd '${pwd}' passes or not`, (t) => {
    const actualPasses = passes(pwd);
    t.equal(
      actualPasses,
      expectedScore >= 30,
      `${pwd} should ${expectedScore < 30 ? 'not' : ''} pass`
    );
    t.end();
  });
});
