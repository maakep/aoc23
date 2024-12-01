const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

const loops = [];

module.exports = () => {
  const sY = input.indexOf(input.find((x) => x.includes('S')));
  const sX = input[sY].indexOf('S');
  traverse(sY, sX, []);
};

function traverse(y, x, path) {
  const newPath = [...path, `${y},${x}`];

  const nextNodes = findNextNodes(y, x, newPath);
  if (nextNodes.length == 0) return newPath;

  const paths = [];
  for (const nodes in nextNodes) {
    const pathLength = traverse(...nodes, newPath);
    paths.push(path);
  }

  return paths;
}

function findNextNodes(y, x, path) {}
