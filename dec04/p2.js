const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

const multipliers = new Array(input.length).fill(1);

module.exports = () => {
  const sums = input.map((game, i) => {
    const segments = game.split(" | ");
    const gameNumbers = segments[0].split(/\s+/);
    const gameWinners = segments[1].split(/\s+/);

    const wins = gameWinners.reduce((a, c) => {
      if (!gameNumbers.includes(c)) return a;

      return a + 1;
    }, 0);

    if (wins > 0) {
      for (let w = 1; w <= wins; w++) {
        multipliers[i + w] += multipliers[i];
      }
    }

    return multipliers[i];
  });
  console.log(sums);
  return sums.reduce((a, c) => a + c, 0);
};
