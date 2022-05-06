<script>
  import { onMount } from 'svelte';
  import Frisky from '../engine/engine';

  let pixiJsElement;

  onMount(() => {
    const frisky = new Frisky({
      view: pixiJsElement,
      antialias: false,
      autoDensity: false,
      backgroundColor: 0x000000,
      backgroundAlpha: 1,
      useContextAlpha: true,
      clearBeforeRender: true,
      preserveDrawingBuffer: false,
      width: 240,
      height: 160,
      legacy: false
    });
    frisky.run();
  })
</script>

<canvas bind:this={pixiJsElement}></canvas>