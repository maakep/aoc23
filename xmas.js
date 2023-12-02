const fs = require('fs');
const arg1 = process.argv[2];
const arg2 = process.argv[3];
const test = process.argv[4] == 't';

if (arg1 == 'g') generate(_0(arg2));
else runSolution(_0(arg1), arg2);

function runSolution(num1, num2) {
  let solution = undefined;
  console.log('');
  try {
    solution = require(`./dec${num1}/p${num2}`);
  } catch (e) {
    console.log(e);
    return console.log(`\r\nNo solution found for ./dec${num1}/p${num2} \r\n(ex: 'node xmas 12' for december 1 part 2)\r\n`);
  }

  const before = performance.now();
  const res = solution();
  const after = performance.now();
  const elapsed = (after - before).toFixed(4);

  console.log(`\n${new Date().toTimeString().substr(0, 8)} (${elapsed}ms) - dec${num1}/p${num2}.js result${test ? ' (test input)' : ''}:`);
  console.log(res);
}

function generate(num) {
  fs.mkdirSync(`./dec${num}`);
  fs.writeFileSync(`./dec${num}/input-test.js`, `module.exports = [];`);
  fs.writeFileSync(`./dec${num}/input.js`, `module.exports = [];`);
  fs.writeFileSync(
    `./dec${num}/p1.js`,
    `const input = process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  return true;
};

`
  );

  fs.writeFileSync(
    `./dec${num}/p2.js`,
    `const input = process.argv[4] == "t" ? require("./input-test") : require("./input");

module.exports = () => {
  return true;
}; 

`
  );
  console.log(`${new Date().toTimeString().substr(0, 8)} - Generated files for day ${num}dec`);
}

function _0(num) {
  return (0 + num).slice(-2);
}
