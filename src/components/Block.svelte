<script>
  export let index;
  export let mark;
  export let side;

  $: computedStyle = () => {
    const sizeStr = `width:${side};height:${side};line-height:${side};`;
    const fontSize = `${parseInt(side, 10) / 2}px;`;
    return `grid-area:b${index};${sizeStr}font-size:${fontSize}`;
  };
</script>

<style>
  div {
    box-sizing: border-box;
    border: 4px ridge aquamarine;
    background-color: lighten(aquamarine, 22%);
  }
</style>

<div style={computedStyle()} on:click>{mark}</div>
