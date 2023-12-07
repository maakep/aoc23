const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const types = [/(.)\1{4}/, /(.)\1{3}/, /((.)\2{2}(.)\3|(.)\4(.)\5{2})/, /(.)\1{2}/, /(.)\1.*(.)\2/, /(.)\1/];
const typeLabels = ['FIVE', 'FOUR', 'HOUSE', 'THREE', 'TWO_P', 'ONE_P', 'HC'];

function cv(val) {
  return cards.indexOf(val);
}

function type(hand) {
  hand = hand
    .split('')
    .sort((a, b) => cards.indexOf(a) - cards.indexOf(b))
    .join('');

  for (const i in types) {
    const type = types[i];
    const res = type.exec(hand);

    if (res != null) {
      return Number(i);
    }
  }

  return types.length;
}

module.exports = () => {
  const handRanks = [];
  for (const i in input) {
    const line = input[i];
    let [hand, bet] = line.split(' ');

    handRanks.push({ hand: hand, index: i, type: type(hand), bet: bet });
  }

  const sortedHands = handRanks.sort((a, b) => {
    if (a.type == b.type) {
      for (const c in a.hand) {
        const card = a.hand[c];
        const card2 = b.hand[c];
        if (card != card2) {
          return cv(card) < cv(card2) ? -1 : 1;
        }
      }
    } else {
      return a.type - b.type;
    }

    return 0;
  });

  const withResult = sortedHands.map((x, i) => {
    return { ...x, lbl: typeLabels[x.type], winnings: Number(x.bet) * (sortedHands.length - i) };
  });
  return withResult.reduce((a, c) => a + c.winnings, 0);
};
