const input = process.argv[4] == 't' ? require('./input-test') : require('./input');

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const types = [/(.)\1{4}/, /(.)\1{3}/, /((.)\2{2}(.)\3|(.)\4(.)\5{2})/, /(.)\1{2}/, /(.)\1.*(.)\2/, /(.)\1/];
const typeLabels = ['FIVE', 'FOUR', 'HOUSE', 'THREE', 'TWO_P', 'ONE_P'];
const typesJ = [/(.)\1{4}/, /(.)\1{3}/, /(.)\1{2}/, /(.)\1/];

/*
12J55 = 3-1 = 2 should be 3
1JJ55 = 3-2 = 1 should be 1
JJJ55 = 3-3 = 0 should be 0


1J555 = 2-1 = 1 should be 1
JJ555 = 2-2 = 0 should be 0

2233J = 3-1 = 2 should be 2

Good graces, I should stop digging this grave...
*/

function cv(val) {
  return cards.indexOf(val);
}

function type(hand) {
  hand = hand
    .split('')
    .sort((a, b) => cards.indexOf(a) - cards.indexOf(b))
    .join('');

  if (hand.includes('J')) {
    const numOfJs = hand.match(/J/g).length;

    for (const i in typesJ) {
      const type = typesJ[i];
      const res = type.exec(hand.replaceAll('J', ''));
      console.log(hand, res);

      if (res != null) {
        if (res[0].length == 2 && hand.match(/(.)\1.*(.)\2/) == null && numOfJs == 1) {
          console.log(hand, 'ret 3');
          return 3;
        }

        console.log(hand, i, numOfJs);
        return Number(i) - numOfJs;
      }
    }

    console.log(hand, 'down here', numOfJs);

    switch (numOfJs) {
      case 4:
      case 5:
        return 0;
      case 3:
        return 1;
      case 2:
        return 3;
      case 1:
        return 5;
    }
  } else {
    for (const i in types) {
      const type = types[i];
      const res = type.exec(hand);
      if (res != null) {
        return Number(i);
      }
    }
    return 6;
  }
}

module.exports = () => {
  const handRanks = [];
  for (const i in input) {
    const line = input[i];
    let [hand, bet] = line.split(' ');

    handRanks.push({ hand: hand, type: type(hand), bet: bet });
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

  console.log(withResult);
  return withResult.reduce((a, c) => a + c.winnings, 0);
};
