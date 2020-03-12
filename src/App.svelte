<script>
  import Block from "./components/Block.svelte";
  import ResultModal from "./components/ResultModal.svelte";
  import Settings from "./components/Settings.svelte";
  import {
    initBlocks,
    getGridTemplateAreasRule,
    getWinner,
    Computer,
    TurnManager
  } from "./lib";

  let len = 3;
  let myMark = "X";
  let opponentMark = "O";
  let computer = new Computer("random");
  const TM = new TurnManager("me");
  let gameFinished = false;
  let winner = null;

  $: blocks = initBlocks(len);
  const fill = index => {
    const x = Math.floor(index / len);
    const y = index % len;
    if (!blocks[x][y].mark && TM.turn === "me") {
      blocks[x][y].mark = myMark;
      TM.nextTurn();
    }
  };

  TM.onOpponentTurn(() => {
    const [x, y] = computer.choice(blocks, { myMark, opponentMark });
    blocks[x][y].mark = opponentMark;
  });
  TM.afterTurnChanges((turn, tm) => {
    winner = getWinner(blocks, { myMark, opponentMark });
    if (winner) tm.stop();
  });
  TM.onStop(() => (gameFinished = true));

  const resetGame = () => {
    blocks = initBlocks(len);
    TM.restart(myMark === "X" ? "me" : "opponent");
    gameFinished = false;
  };
</script>

<style>
  .grid-container {
    display: grid;
    margin: 1rem auto;
    width: 400px;
    height: 400px;
    position: relative;
  }
</style>

<main>
  <div class="grid-container" style={getGridTemplateAreasRule(len)}>
    {#each blocks.flat() as block, index (index)}
      <Block {...block} {index} on:click={() => fill(index)} />
    {/each}
    {#if gameFinished}
      <ResultModal {winner} on:reset={resetGame} />
    {/if}
  </div>
</main>

<Settings
  {len}
  {myMark}
  computerAlgorithm={computer.algorithm}
  on:apply={event => {
    const { length, mark, computerAlgorithm, maxDepth } = event.detail;
    len = length;
    myMark = mark;
    opponentMark = myMark === 'X' ? 'O' : 'X';
    computer.algorithm = computerAlgorithm;
    computer.maxDepth = maxDepth;
    resetGame();
  }} />
