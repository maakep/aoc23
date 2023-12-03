const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  let number = '';
  let numberHasAdjacentSymbol = false;
  const numbers = [];

  for (const i in input) {
    const line = input[i];

    for (const ci in line) {
      const char = line[ci];

      if (!isNaN(char)) {
        number += char;
        const isTouching = isTouchingSymbol(Number(ci), Number(i));

        if (isTouching) {
          numberHasAdjacentSymbol = true;
        }
      } else {
        if (numberHasAdjacentSymbol) {
          numbers.push(Number(number));
        }
        numberHasAdjacentSymbol = false;
        number = '';
      }
    }
  }

  return numbers.reduce((a, c) => a + c, 0);
};

function isTouchingSymbol(x, y) {
  const adjacentElements = [];

  adjacentElements.push(
    ...[
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
    ].filter((x) => x.val != undefined)
  );

  return adjacentElements.some((x) => isNaN(x.val) && x.val != '.');
}
