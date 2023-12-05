const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  let lowestLocation = Number.MAX_SAFE_INTEGER;

  const { seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation } = input;

  for (const i in seeds) {
    if (i % 2 != 0) continue;

    const seedBase = seeds[i];
    const seedCount = seeds[Number(i) + 1];
    console.log(seedBase, seedCount);

    for (let s = 0; s < seedCount; s++) {
      const seed = seedBase + s;

      if (s % 1000000 == 0) console.log(s);

      const destSoil = search(seed, seedToSoil);
      const destFert = search(destSoil, soilToFertilizer);
      const destWater = search(destFert, fertilizerToWater);
      const destLight = search(destWater, waterToLight);
      const destTemp = search(destLight, lightToTemperature);
      const destHum = search(destTemp, temperatureToHumidity);
      const destLoc = search(destHum, humidityToLocation);

      if (destLoc < lowestLocation) {
        lowestLocation = destLoc;
      }
    }
  }

  return lowestLocation;
};

function search(val, ranges) {
  for (const range of ranges) {
    const [dest, start, quant] = range;

    const found = val >= start && val <= start + quant;

    if (found) {
      return dest + (val - start);
    }
  }

  return val;
}
