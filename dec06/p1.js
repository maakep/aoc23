const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  const { time, distance } = input;

  const allWinnables = [];

  for (const i in time) {
    const timeRecord = time[i];
    const dist = distance[i];
    const winnables = [];

    for (let t = timeRecord - 1; t > 0; t--) {
      const timeToDrive = timeRecord - t;
      const achievableDistance = timeToDrive * t;

      if (achievableDistance > dist) {
        winnables.push(t);
      }
    }
    allWinnables.push(winnables.length);
  }
  console.log(allWinnables);
  return allWinnables.reduce((a, c) => (a *= c));
};
