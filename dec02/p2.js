const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  const powers = [];

  for (const i in input) {
    const row = input[i];

    const reds = row.match(/\d+(?=\sred)/g).map((x) => Number(x));
    const blues = row.match(/\d+(?=\sblue)/g).map((x) => Number(x));
    const greens = row.match(/\d+(?=\sgreen)/g).map((x) => Number(x));

    const rMax = Math.max(...reds);
    const bMax = Math.max(...blues);
    const gMax = Math.max(...greens);

    powers.push(rMax * bMax * gMax);
  }

  return powers.reduce((a, c) => a + c, 0);
};
