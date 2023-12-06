const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  const { time, distance } = input;

  const timeRecord = time;
  const dist = distance;
  const winnables = [];

  for (let t = timeRecord - 1; t > 0; t--) {
    const timeToDrive = timeRecord - t;
    const achievableDistance = timeToDrive * t;

    if (achievableDistance > dist) {
      winnables.push(t);
    }
  }

  return winnables.length;
};
