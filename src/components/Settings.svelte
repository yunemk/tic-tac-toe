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

  hr {
    max-width: 800px;
  }

  h1 {
    text-align: center;
    margin: 0;
  }

  .container {
    display: grid;
    grid-row-gap: 1rem;
    max-width: 500px;
    margin: 0 auto 0.5rem;
    div {
      display: grid;
      grid-row-gap: 0.5rem;
    }
  }

  button {
    margin: 0;
    border: 0;
    font-size: 2rem;
    background-color: $gray-color;
    &:active {
      background-color: darken($gray-color, 10%);
    }
    &.disabled {
      background-color: lighten($gray-color, 10%);
    }
  }

  .counter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid $gray-color;
    button {
	padding: 0.5rem;
	font-size: 2.5rem;
    }
    span {
	margin: auto;
	font-size: 2.5rem;
    }
  }

  .two-choices {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    .chosen {
      background: lighten(aqua, 10%);
    }
  }

  .computer input {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .apply {
    $apply-color: #ff8c8c;
    width: 50%;
    margin: 0 auto 1rem auto;
    background-color: $apply-color;
    &:active {
      background-color: darken($apply-color, 3%);
    }
  }
</style>

<hr />
<div class="container">
  <h1>Settings</h1>
  <div class="length">
    <div>No. side blocks (3 x 3 ~ 10 x 10 grid)</div>
    <div class="counter">
      <button
        class={len === 3 ? 'disabled' : ''}
        on:click={() => (len = --len >= 3 ? len : 3)}
      >-</button>
      <span>{len}</span>
      <button
        class={len === 10 ? 'disabled' : ''}
        on:click={() => (len = ++len <= 10 ? len : 10)}
      >+</button>
    </div>
  </div>
  <div class="marks">
    <div>Player (X: first, O: later)</div>
    <div class="two-choices">
      <button
        class={myMark === 'X' ? 'chosen' : ''}
        on:click={() => (myMark = 'X')}>
        X
      </button>
      <button
        class={myMark === 'O' ? 'chosen' : ''}
        on:click={() => (myMark = 'O')}>
        O
      </button>
    </div>
  </div>
  <div class="computer">
    <div>Computer algorithm</div>
    <div class="two-choices">
      <button
        class={computerAlgorithm === 'random' ? 'chosen' : ''}
        on:click={() => (computerAlgorithm = 'random')}>
        Random
      </button>
      <button
        class={computerAlgorithm === 'minimax' ? 'chosen' : ''}
        on:click={() => (computerAlgorithm = 'minimax')}>
        Minimax
      </button>
    </div>
    {#if computerAlgorithm === 'minimax'}
      <div class="max-depth">
        <div>Depth: {maxDepth}</div>
        <input type="range" min="1" max={len ** 2} bind:value={maxDepth} />
        <div>It might become sluggish when this value is set too high.</div>
      </div>
    {/if}
  </div>
  <button class="apply" on:click={apply}>Apply</button>
</div>
