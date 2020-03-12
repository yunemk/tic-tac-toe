export default (blocks, { myMark, opponentMark }) => {
  const length = blocks.length;
  let mark =
    alignedVerticalWith() || alignedHorizontalWith() || alignedDiagonallyWith();

  if (mark === myMark) {
    return 'me';
  } else if (mark === opponentMark) {
    return 'opponent';
  } else if (noBlocksAvailable()) {
    return 'tie';
  } else if (mark === '') {
    return null;
  }

  function alignedVerticalWith() {
    for (let x = 0; x < length; x++) {
      const currentMark = blocks[x][0].mark;
      if (currentMark === '') continue;
      const col = blocks[x];
      if (col.every(block => block.mark === currentMark)) {
        return currentMark;
      }
    }
    return '';
  }

  function alignedHorizontalWith() {
    for (let y = 0; y < length; y++) {
      const currentMark = blocks[0][y].mark;
      if (currentMark === '') continue;
      let x;
      for (x = 1; x < length; x++) {
        if (blocks[x][y].mark !== currentMark) {
          break;
        }
      }
      if (x === length) return currentMark;
    }
    return '';
  }

  function alignedDiagonallyWith() {
    return uL() || lL();

    function uL() {
      const upperLeftMark = blocks[0][0].mark;
      if (upperLeftMark === '') return '';
      for (let i = 1; i < length; i++) {
        if (blocks[i][i].mark !== upperLeftMark) {
          return '';
        }
      }
      return upperLeftMark;
    }

    function lL() {
      const lowerLeftMark = blocks[0][length - 1].mark;
      if (lowerLeftMark === '') return '';
      for (let i = 0; i < length; i++) {
        if (blocks[i][length - 1 - i].mark !== lowerLeftMark) {
          return '';
        }
      }
      return lowerLeftMark;
    }
  }

  function noBlocksAvailable() {
    return !blocks.flat(2).some(block => block.mark === '');
  }
};
