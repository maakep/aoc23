const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  const sums = input.map((game) => {
    const segments = game.split(" | ");
    const gameNumbers = segments[0].split(/\s+/);
    const gameWinners = segments[1].split(/\s+/);

    console.log(gameNumbers, gameWinners);

    const sum = gameWinners.reduce((a, c) => {
      if (!gameNumbers.includes(c)) return a;

      return a == 0 ? 1 : a * 2;
    }, 0);

    return sum;
  });
  return sums.reduce((a, c) => a + c, 0);
};
