<script>
  import chroma from 'chroma-js';
  import pickerColors from './picker_colors.json';
  import { createEventDispatcher, onMount } from 'svelte';

  export let onLeft = false;

  const channelSteps = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 
                        0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff];
  const dispatch = createEventDispatcher();
  let pickerPane, hueSlider, pickerPaneContext, hueSliderContext;

  $: hueColor = pickerColors[0];
  $: currentColor = clampColor([0, 0.5, 1.0], 'hsv');
  const [paneWidth, paneHeight, sliderWidth, sliderHeight] = [204, 136, 276, 24];
  const [blockWidth, blockHeight] = [paneWidth/17, paneHeight/17];

  function setColor(r,g,b) {
    currentColor = clampColor([r,g,b]);
    console.log(currentColor.hex());

    updateColorPicker();
  }

  function updateColorPicker() {
    drawColorPickerPane();
    drawHueSlider();

    dispatch('color_picker_change', { rgbColor: currentColor.rgb(), isMouseUp: true });
  }

  function drawColorPickerPane() {
    pickerPane.width = paneWidth;
    pickerPane.height = paneHeight;
    pickerPaneContext.fillStyle = 'black';
    pickerPaneContext.fillRect(0, 0, paneWidth, paneHeight);

    console.log(pickerColors);
    const pickerColor = pickerColors[0];
      for (let y = 0; y <= 16; y += 1) {
        for (let x = 0; x <= 16; x += 1) {
          const paneIndex = y * 17 + x;
          pickerPaneContext.fillStyle = chroma(pickerColor.paneColors[paneIndex]).hex();
          pickerPaneContext.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
    }
  }

  function drawHueSlider() {
    hueSlider.width = sliderWidth;
    hueSlider.height = sliderHeight;

    let pos = 0;
    for (const pickerColor of pickerColors) {
      hueSliderContext.fillStyle = pickerColor.hue;
      hueSliderContext.fillRect(pos, 0, 3, sliderHeight);

      pos += 3;
    }
  }

  function clampColor(color, space = 'rgb') {
    const rgb = chroma(...color, space).rgb();
    const clampedRgb = [0,0,0];

    for (let c = 0; c < 3; c += 1) {
      let clampedChannel = Math.min(255, Math.round(rgb[c] / 17) / 15 * 255);
      clampedRgb[c] = clampedChannel;
    }
 
    return chroma(clampedRgb);
  }

  onMount(() => {
    pickerPaneContext = pickerPane.getContext("2d");
    hueSliderContext = hueSlider.getContext("2d");

    setColor(0,0,0);
  });
</script>

<div>
  <div class='picker-top'>
    <div class='{onLeft ? 'left' : 'right'} colorPreview'
        style='background-color: {currentColor.hex()}'></div>
    <canvas class='{onLeft ? 'left' : 'right'} colorPane'
            bind:this={pickerPane}></canvas>
  </div>
  <canvas class='{onLeft ? ' left' : ' right'} hueSlider'
          bind:this={hueSlider}></canvas>
</div>

<style>
  .colorPane {
    float: right;
    background-color: #ccc;
    padding: 2px;
  }

  .colorPreview {
    width: 74px;
    margin: 1px 4px 0px 0px;
    border: 2px solid #ccc;
  }

  .picker-top {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
  }

  .hueSlider {
    background-color: #ccc;
    padding: 2px;
  }
  
</style>
