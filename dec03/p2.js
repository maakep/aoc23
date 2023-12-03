const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  let number = '';
  let numberHasAdjacentSymbol = false;
  const numbers = [];
  const symbols = new Set();

  for (const i in input) {
    const line = input[i];

    for (const ci in line) {
      const char = line[ci];

      if (!isNaN(char)) {
        number += char;
        const touchedGears = adjacentGears(Number(ci), Number(i));
        touchedGears.map((x) => `${x.y}-  ${x.x}`).forEach((x) => symbols.add(x));
      } else {
        numbers.push({ num: Number(number), closeTo: Array.from(symbols) });
        symbols.clear();
        numberHasAdjacentSymbol = false;
        number = '';
      }
    }

    if (number != '') {
      numbers.push({ num: Number(number), closeTo: Array.from(symbols) });
    }
    number = '';
    symbols.clear();
    numberHasAdjacentSymbol = false;
  }

  const gearsAndTheirNumbers = {};
  numbers
    .filter((x) => x.closeTo.length > 0)
    .forEach((x) => {
      x.closeTo.forEach((xy) => {
        gearsAndTheirNumbers[xy] = [...(gearsAndTheirNumbers[xy] || []), x.num];
      });
    });

  let sum = 0;

  Object.keys(gearsAndTheirNumbers).forEach((x) => {
    if (gearsAndTheirNumbers[x].length == 2) {
      console.log(x, gearsAndTheirNumbers[x]);
      sum += gearsAndTheirNumbers[x][0] * gearsAndTheirNumbers[x][1];
    }
  });

  return sum;
};

function adjacentGears(x, y) {
  return [
    {
      x: x - 1,
      y: y - 1,
      val: input[y - 1]?.[x - 1],
    },
    {
      x: x,
      y: y - 1,
      val: input[y - 1]?.[x],
    },
    {
      x: x + 1,
      y: y - 1,
      val: input[y - 1]?.[x + 1],
    },
    {
      x: x - 1,
      y: y,
      val: input[y][x - 1],
    },
    {
      x: x + 1,
      y: y,
      val: input[y][x + 1],
    },

    {
      x: x - 1,
      y: y + 1,
      val: input[y + 1]?.[x - 1],
    },
    {
      x: x,
      y: y + 1,
      val: input[y + 1]?.[x],
    },
    {
      x: x + 1,
      y: y + 1,
      val: input[y + 1]?.[x + 1],
    },
  ].filter((x) => x.val == '*');
}
