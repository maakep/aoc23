const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

const rMax = 12;
const gMax = 13;
const bMax = 14;

module.exports = () => {
  const ids = [];
  for (const i in input) {
    const row = input[i];

    const reds = row.match(/\d+(?=\sred)/g);
    const blues = row.match(/\d+(?=\sblue)/g);
    const greens = row.match(/\d+(?=\sgreen)/g);

    if (reds.some((x) => Number(x) > rMax)) continue;
    if (blues.some((x) => Number(x) > bMax)) continue;
    if (greens.some((x) => Number(x) > gMax)) continue;

    ids.push(Number(i) + 1);
  }

  return ids.reduce((a, c) => a + c, 0);
};
