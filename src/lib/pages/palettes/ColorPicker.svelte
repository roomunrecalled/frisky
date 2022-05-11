<script>
  import chroma from 'chroma-js';
  import { createEventDispatcher, onMount } from 'svelte';

  export let onLeft = false;

  const channelSteps = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 
                        0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff];
  const hueConfigs = [[1,0,0], [1,1,0], [0,1,0], [0,1,1], [0,0,1], [1,0,1], [1,0,0]];//, [1,1,0]];
  const dispatch = createEventDispatcher();
  let pickerPane, hueSlider, pickerPaneContext, hueSliderContext;

  $: hueColor = [];
  $: currentColor = clampColor([0, 0.5, 1.0], 'hsv');
  const [paneWidth, paneHeight, sliderWidth, sliderHeight] = [288, 192, 368, 24];

  function setColor(r,g,b) {
    currentColor = clampColor([r,g,b]);
    console.log(currentColor);
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
  }

  function drawHueSlider() {
    hueSlider.width = sliderWidth;
    hueSlider.height = sliderHeight;

    const maxStepsIndex = channelSteps.length - 1;
    let hueConfigIndex = 0;
    let hueConfig = hueConfigs[hueConfigIndex];
    let [iR, iG, iB] = [maxStepsIndex, 0, 0];
    let pos = 0;
    while (hueConfigIndex < hueConfigs.length) {//(pos < sliderWidth) {
      hueSliderContext.fillStyle = chroma(
        channelSteps[iR], channelSteps[iG], channelSteps[iB]).hex();
      hueSliderContext.fillRect(pos, 0, 4, sliderHeight);

      if (hueConfig[0] > 0) {
        iR = Math.min(iR + 1, maxStepsIndex);
      } else {
        iR = Math.max(iR - 1, 0);
      }
      if (hueConfig[1] > 0) {
        iG = Math.min(iG + 1, maxStepsIndex);
      } else {
        iG = Math.max(iG - 1, 0);
      }
      if (hueConfig[2] > 0) {
        iB = Math.min(iB + 1, maxStepsIndex);
      } else {
        iB = Math.max(iB - 1, 0);
      }

      if (iR === hueConfig[0] * maxStepsIndex && 
          iG == hueConfig[1] * maxStepsIndex &&
          iB == hueConfig[2] * maxStepsIndex) {
        hueConfigIndex += 1;
        hueConfig = hueConfigs[hueConfigIndex];
      }

      pos += 4;
    }
    hueSliderContext.fillStyle = chroma(
      channelSteps[iR], channelSteps[iG], channelSteps[iB]).hex();
    hueSliderContext.fillRect(pos, 0, 4, sliderHeight);
  }

  function clampColor(color, space = 'rgb') {
    const rgb = chroma(...color, space).rgb();
    const clampedRgb = [];

    for (const channel of rgb) {
      let clampedChannel = Math.max(255, Math.round(channel / 17) / 15 * 255);
      clampedRgb.push(clampedChannel);
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
    width: 84px;
    height: 191px;
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
