<script>
  import chroma from 'chroma-js';
  import { onMount, createEventDispatcher } from "svelte";
  import ColorPicker from './ColorPicker.svelte';

  export let onLeft = false;
  const dispatch = createEventDispatcher();

  function handleColorChange(event) {
    console.log(event);
  };

  function updateHexCode() { }

</script>

<ColorPicker  on:color_picker_change={handleColorChange}
              {onLeft} />