<script>
  import chroma from 'chroma-js';
  import pickerColors from './picker_colors.json';
  import { createEventDispatcher, onMount } from 'svelte';

  export let onLeft = false;

  const dispatch = createEventDispatcher();
  let pickerPane, hueSliderBg, pickerPaneContext, hueSliderContext;
  let hueSliderPicker;

  const [paneWidth, paneHeight] = [204, 136];
  const [blockWidth, blockHeight] = [paneWidth/17, paneHeight/17];

  let [currentHue, currentColor] = [pickerColors[0], chroma(pickerColors[0].hue)]

  function setColor(color) {
    currentColor = chroma(currentHue.hue);
    updateColorPicker();
  }

  function setHue(hue) {
    currentHue = hue;
    // todo -- change this.
    currentColor = chroma(currentHue.hue);
    updateColorPicker();
  }

  function updateColorPicker() {
    drawColorPickerPane();

    //dispatch('color_picker_change', { rgbColor: chroma(currentColor).rgb(), isMouseUp: true });
  }

  function drawColorPickerPane() {
    pickerPane.width = paneWidth;
    pickerPane.height = paneHeight;
    pickerPaneContext.fillStyle = 'black';
    pickerPaneContext.fillRect(0, 0, paneWidth, paneHeight);

    const pickerColor = currentHue;
      for (let y = 0; y <= 16; y += 1) {
        for (let x = 0; x <= 16; x += 1) {
          const paneIndex = y * 17 + x;
          pickerPaneContext.fillStyle = chroma(pickerColor.paneColors[paneIndex]).hex();
          pickerPaneContext.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
    }
  }

  let selectingHue = false;
  function pickHueStart() { selectingHue = true; }
  function pickHueMove(event) {
    if (selectingHue) {
      pickHue(event);
    }
  }
  function pickHueEnd() { selectingHue = false; }
  function pickHue(event) {
    const leftOffset = Math.max(0,event.pageX - hueSliderBg.offsetLeft);
    setHue(pickerColors[Math.min(89, Math.floor(leftOffset/3))]);

    if (hueSliderPicker) {
      hueSliderPicker.style.left = `${Math.min(268, leftOffset - 2)}px`;
    }
  }

  onMount(() => {
    pickerPaneContext = pickerPane.getContext("2d");

    updateColorPicker();
  });
</script>

<div>
  <div class='picker-top'>
    <div class='{onLeft ? 'left' : 'right'} colorPreview'
        style='background-color: {currentColor.hex()}'></div>
    <canvas class='{onLeft ? 'left' : 'right'} colorPane'
            bind:this={pickerPane}></canvas>
  </div>
  <div  class='hue-slider-bg'
        on:mousedown={pickHueStart} 
        on:mousemove={pickHueMove} 
        on:mouseup={pickHueEnd}
        on:mouseleave={() => { selectingHue = false; }}
        bind:this={hueSliderBg} >
    <div  class='slider-picker' bind:this={hueSliderPicker}></div>
  </div>
</div>

<style>
  .colorPane {
    float: right;
    background-color: #ccc;
    padding: 2px;
  }

  .colorPreview {
    width: 70px;
    margin: 1px 4px 0px 0px;
    border: 2px solid #ccc;
  }

  .picker-top {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
  }

  .hue-slider-bg {
    margin: auto;
    width: 270px;
    height: 24px;
    padding-top: 2px;
    background-image: url('/slider_bg.png');
    border: 2px solid #ccc;
  }
  .slider-picker {
    width: 2px;
    height: 20px;
    border: 1px solid #ccc;
    background-color: white;
    position: relative;
  }
</style>
