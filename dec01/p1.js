const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  const parsed = input.map((i) => {
    const nums = i.match(/[0-9]/g);
    const first = nums[0];
    const last = nums[nums.length - 1];
    return Number(first + last);
  }, 0);

  const sum = parsed.reduce((c, a) => c + a, 0);

  return sum;
};
