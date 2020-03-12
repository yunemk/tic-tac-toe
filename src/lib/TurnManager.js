let afterTurnChangesFunction = null;
let onStopFunction = null;
let onOpponentTurnFunction = null;

export default class TurnManager {
  constructor(firstTurn) {
    this.running = true;
    this.firstTurn = firstTurn;
    this._turn = firstTurn;
  }

  get turn() {
    return this._turn;
  }

  set turn(_) {
    throw new Error('Not allowed to be changed by assignment.');
  }

  nextTurn() {
    this._turn = this.oppositeTurn;
    afterTurnChangesFunction && afterTurnChangesFunction(this.turn, this);
    if (this.turn === 'opponent')
      onOpponentTurnFunction && onOpponentTurnFunction(this);
    return this;
  }

  get oppositeTurn() {
    return this.turn === 'me' ? 'opponent' : 'me';
  }

  afterTurnChanges(fn) {
    afterTurnChangesFunction = (turn, tm) => fn(turn, tm);
  }

  onOpponentTurn(fn) {
    onOpponentTurnFunction = tm => {
      fn(tm);
      tm.nextTurn();
    };
    if (this.firstTurn === 'opponent')
      onOpponentTurnFunction && onOpponentTurnFunction(this);
  }

  stop() {
    this.running = false;
    this._turn = 'none';
    onStopFunction && onStopFunction(this);
    return this;
  }

  onStop(fn) {
    onStopFunction = tm => fn(tm);
  }

  restart(firstTurn = this.firstTurn) {
    this.running = true;
    this.firstTurn = firstTurn;
    this._turn = firstTurn;
    if (this.turn === 'opponent')
      onOpponentTurnFunction && onOpponentTurnFunction(this);
    return this;
  }
}
