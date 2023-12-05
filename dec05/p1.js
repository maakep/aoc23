const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

module.exports = () => {
  let lowestLocation = Number.MAX_SAFE_INTEGER;

  const { seeds, seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation } = input;

  for (const seed of seeds) {
    const destSoil = search(seed, seedToSoil);
    const destFert = search(destSoil, soilToFertilizer);
    const destWater = search(destFert, fertilizerToWater);
    const destLight = search(destWater, waterToLight);
    const destTemp = search(destLight, lightToTemperature);
    const destHum = search(destTemp, temperatureToHumidity);
    const destLoc = search(destHum, humidityToLocation);

    console.log(destLoc);
    if (destLoc < lowestLocation) {
      lowestLocation = destLoc;
    }
  }

  return lowestLocation;
};

function search(val, ranges) {
  for (const range of ranges) {
    const [dest, start, quant] = range;

    const found = val >= start && val <= start + quant;

    console.log(' - - - - ');
    console.log(found);
    console.log(val, start, '-', start + quant);

    if (found) {
      console.log('next: ', dest + (val - start));

      return dest + (val - start);
    }
  }

  return val;
}
