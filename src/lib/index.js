const getSquareMatrix = (length, mapFn) => {
  mapFn = mapFn || (() => null);
  const matrix = [...Array(length)];
  for (let i = 0; i < length; i++) {
    matrix[i] = [...Array(length)];
    for (let j = 0; j < length; j++) {
      matrix[i][j] = mapFn(i, j);
    }
  }
  return matrix;
};

export const initBlocks = length => {
  const mark = '';
  const side = `${Math.floor(400 / length)}px`;
  return getSquareMatrix(length, () => ({ mark, side }));
};

export const getGridTemplateAreasRule = length => {
  // vertical: increased by 1, horizontal: increase by length
  const mat = getSquareMatrix(length, (c, r) => `b${c + r * length}`);
  // [["b0", "b2"], ["b1", "b3"]] => ['"b0 b2"', '"b1 b3"']
  const strRows = mat.map(row => `"${row.join(' ')}"`);
  const areas = strRows.join('');
  return 'grid-template-areas:' + areas;
};

export { default as getWinner } from './getWinner.js';
export { default as Computer } from './Computer.js';
export { default as TurnManager } from './TurnManager.js';
