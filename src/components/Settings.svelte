<script>
  import { createEventDispatcher } from "svelte";
  export let len;
  export let myMark;
  export let computerAlgorithm;

  let maxDepth = 3;

  const dispatch = createEventDispatcher();

  const apply = () => {
    dispatch("apply", {
      length: len,
      mark: myMark,
      computerAlgorithm,
      maxDepth
    });
  };
</script>

<style lang="scss">
  $gray-color: #ccc;
  $selected-color: lighten(aqua, 10%);

  hr {
    max-width: 800px;
  }

  button {
    font-size: 2rem;
    background-color: $gray-color;
    &:active {
      background-color: darken($gray-color, 10%);
    }
  }

  .button-group {
    display: grid;
    .current {
      background: $selected-color;
    }
  }

  .container {
    display: grid;
    grid-row-gap: 1rem;
    max-width: 500px;
    margin: 0 auto 0.5rem;
  }

  h1 {
    margin: 0;
  }

  .length {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    .button-group {
      grid-template-columns: repeat(3, 1fr);
      border: 1.5px solid $gray-color;
      align-items: center;
      span {
        font-size: 1.5rem;
      }
    }
  }

  .marks {
    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 0.5rem;
    .button-group {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 2rem;
    }
  }

  .computer {
    display: grid;
    grid-row-gap: 0.5rem;
    .button-group {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 2rem;
    }
  }

  .apply {
    padding: 0.5rem 0;
    $apply-color: #e0afaf;
    background-color: $apply-color;
    &:active {
      background-color: darken($apply-color, 5%);
    }
  }
</style>

<hr />
<div class="container">
  <h1>Settings</h1>
  <div class="length">
    <div>Number of side blocks</div>
    <div class="button-group">
      <button on:click={() => (len = ++len <= 10 ? len : 10)}>+</button>
      <span>{len}</span>
      <button on:click={() => (len = --len >= 3 ? len : 3)}>-</button>
    </div>
  </div>
  <div class="marks">
    <div>Player (X: first, O: later)</div>
    <div class="button-group">
      <button
        class={myMark === 'X' ? 'current' : ''}
        on:click={() => (myMark = 'X')}>
        X
      </button>
      <button
        class={myMark === 'O' ? 'current' : ''}
        on:click={() => (myMark = 'O')}>
        O
      </button>
    </div>
  </div>
  <div class="computer">
    <div>Computer algorithm</div>
    <div class="button-group">
      <button
        class={computerAlgorithm === 'random' ? 'current' : ''}
        on:click={() => (computerAlgorithm = 'random')}>
        Random
      </button>
      <button
        class={computerAlgorithm === 'minimax' ? 'current' : ''}
        on:click={() => (computerAlgorithm = 'minimax')}>
        Minimax
      </button>
    </div>
    {#if computerAlgorithm === 'minimax'}
      <div class="max-depth">
        <div>Depth: {maxDepth}</div>
        <input type="range" min="1" max={len ** 2} bind:value={maxDepth} />
        <div>*It will be slow when this value is set too high.</div>
      </div>
    {/if}
  </div>
  <button class="apply" on:click={apply}>Apply</button>
</div>
