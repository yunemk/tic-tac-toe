import getWinner from './getWinner.js';

let length;
const scores = { me: -1, opponent: 1, tie: 0 };
let myCachedMark;
let opponentCachedMark;

export default class Computer {
  constructor(algorithm = 'random', maxDepth = 1) {
    this.algorithm = algorithm;
    this.maxDepth = maxDepth;
  }

  choice(blocks, configObj) {
    if (this.algorithm === 'random') return this.randomSpot(blocks);
    else if (this.algorithm === 'minimax')
      return this.bestPos(blocks, configObj);
  }

  randomSpot(blocks) {
    const length = blocks.length;
    const availablePos = [];
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (!blocks[i][j].mark) availablePos.push([i, j]);
      }
    }
    return availablePos[Math.floor(Math.random() * availablePos.length)];
  }

  bestPos(blocks, { myMark, opponentMark }) {
    length = blocks.length;
    myCachedMark = myMark;
    opponentCachedMark = opponentMark;
    let bestScore = -Infinity;
    let pos;
    for (let x = 0; x < length; x++) {
      for (let y = 0; y < length; y++) {
        const block = blocks[x][y];
        if (block.mark === '') {
          block.mark = opponentCachedMark;
          const score = this.minimax(blocks, 0, false);
          block.mark = '';
          if (score > bestScore) {
            bestScore = score;
            pos = [x, y];
          }
        }
      }
    }
    return pos;
  }

  minimax(blocks, depth, isMaximizing) {
    const winner = getWinner(blocks, {
      myMark: myCachedMark,
      opponentMark: opponentCachedMark
    });
    if (winner !== null) {
      return scores[winner];
    } else if (depth >= this.maxDepth) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let x = 0; x < length; x++) {
        for (let y = 0; y < length; y++) {
          const block = blocks[x][y];
          if (block.mark === '') {
            block.mark = opponentCachedMark;
            const score = this.minimax(blocks, depth + 1, false);
            block.mark = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let x = 0; x < length; x++) {
        for (let y = 0; y < length; y++) {
          const block = blocks[x][y];
          if (block.mark === '') {
            block.mark = myCachedMark;
            const score = this.minimax(blocks, depth + 1, true);
            block.mark = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
}
