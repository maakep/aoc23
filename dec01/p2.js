const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

const numberMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
};

module.exports = () => {
  const parsed = input.map((i) => {
    const matchers = Object.keys(numberMap);
    const firstMatches = matchers
      .map((x) => ({ rank: i.indexOf(x), num: x }))
      .filter((x) => x.rank != -1)
      .sort((a, b) => a.rank - b.rank);
    const first = firstMatches[0];
    const lastMatches = matchers
      .map((x) => ({ rank: i.lastIndexOf(x), num: x }))
      .filter((x) => x.rank != -1)
      .sort((a, b) => a.rank - b.rank);
    const last = lastMatches[lastMatches.length - 1];

    console.log(firstMatches, lastMatches);
    console.log(first, last);
    console.log('---');

    const f = numberMap[first.num] || first.num;
    const l = numberMap[last.num] || last.num;

    console.log(f, l);

    return Number(f + l);
  }, 0);

  const sum = parsed.reduce((c, a) => {
    return a + c;
  }, 0);

  return sum;
};
