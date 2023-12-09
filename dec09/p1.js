const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  const finals = [];

  for (const line of input) {
    const matrix = [line.map((x) => Number(x))];

    while (matrix[matrix.length - 1].some((x) => x != 0)) {
      const nextMatrix = [];
      for (let i = 1; i < matrix[matrix.length - 1].length; i++) {
        nextMatrix.push(matrix[matrix.length - 1][i] - matrix[matrix.length - 1][i - 1]);
      }

      matrix.push(nextMatrix);
    }

    const reversed = matrix.reverse();
    console.log(reversed);
    for (const lis in reversed.slice(0, -1)) {
      const li = Number(lis);
      const last = reversed[li][reversed[li].length - 1];
      const nextLast = reversed[li + 1]?.[reversed[li + 1].length - 1];
      console.log(last, nextLast);
      const nextPrediction = last + nextLast;

      reversed[li + 1].push(nextPrediction);
    }

    console.log(reversed);
    finals.push(reversed[reversed.length - 1][reversed[reversed.length - 1].length - 1]);
  }

  return finals.reduce((a, c) => a + c, 0);
};
