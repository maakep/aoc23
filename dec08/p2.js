const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

// module.exports = () => {
//   const { instruction, path } = input;
//   const startingNodes = Object.keys(path).filter((x) => x.endsWith('A'));

//   let nextNodes = startingNodes.map((x) => path[x]);
//   let count = 0;

//   while (true) {
//     for (const LR of instruction) {
//       const newKeys = nextNodes.map((x) => x[LR]);

//       if (count % 10000000 == 0) {
//         console.log('---', count);
//         console.log(nextNodes);
//         console.log(newKeys);
//       }

//       count++;
//       if (!newKeys.some((x) => !x.endsWith('Z'))) {
//         console.log(newKeys);
//         return count;
//       }

//       nextNodes = newKeys.map((x) => path[x]);
//     }
//   }
// };

module.exports = () => {
  const { instruction, path } = input;
  const startingNodes = Object.keys(path).filter((x) => x.endsWith('A'));

  const pathsToZ = [];

  for (const node of startingNodes) {
    const res = findPathToZ(node);
    pathsToZ.push(res);
  }

  return findLCM(pathsToZ, pathsToZ.length);
};

function findPathToZ(nextStep) {
  let done = false;
  let count = 0;

  while (!done) {
    for (const LR of input.instruction) {
      nextStep = input.path[nextStep][LR];

      count++;

      if (nextStep.endsWith('Z')) {
        return count;
      }
    }
  }
}

// copy-paste letsgo

function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

function findLCM(arr, n) {
  let ans = arr[0];

  for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);

  return ans;
}
