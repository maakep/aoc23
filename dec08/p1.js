const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  const { instruction, path } = input;

  let nextStep = 'AAA';
  let count = 0;

  let done = false;

  while (!done) {
    for (const i in instruction) {
      const LR = instruction[i];
      nextStep = path[nextStep][LR];

      count++;

      if (nextStep == 'ZZZ') {
        done = true;
        break;
      }
    }
  }

  return count;
};
