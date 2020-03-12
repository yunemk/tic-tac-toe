<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let winner;

  const getMessage = () => {
    switch (winner) {
      case "me":
        return "You won!";
      case "opponent":
        return "You failed...";
      case "tie":
        return "Tie";
    }
  };
</script>

<style lang="scss">
  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #111;
    opacity: 0.8;
    h1 {
      font-size: 4rem;
      margin: 0 0 1rem;
      color: white;
    }
    button {
      padding: 0.5rem 2rem;
      background-color: aquamarine;
      border-radius: 1rem;
      box-shadow: 0 3px 3px gray;
      font-size: 2rem;
      &:active {
        box-shadow: none;
        margin: 1px 0 -2px;
      }
    }
  }
</style>

<div class="modal" in:fade>
  <h1>{getMessage()}</h1>
  <button on:click={() => dispatch('reset')}>Reset</button>
</div>
