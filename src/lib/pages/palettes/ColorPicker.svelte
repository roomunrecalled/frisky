<script>
  import chroma from 'chroma-js';
  import pickerColors from './picker_colors.json';
  import { createEventDispatcher, onMount } from 'svelte';

  export let onLeft = false;

  const channelSteps = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 
                        0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff];
  const dispatch = createEventDispatcher();
  let pickerPane, hueSlider, pickerPaneContext, hueSliderContext;

  $: hueColor = [];
  $: currentColor = clampColor([0, 0.5, 1.0], 'hsv');
  const [paneWidth, paneHeight, sliderWidth, sliderHeight] = [192, 128, 276, 24];

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

    // top left corner is white
    // top right corner is the huecolor
    // bottom corners are black.
    //const whiteColor = [255,255,255];
    //const blackColor = [0,0,0];

    const blockWidth = Math.floor(paneWidth/17);
    const blockHeight = Math.floor(paneHeight/17);

    //const newPickerColors = [];
    console.log(pickerColors);
    const pickerColor = pickerColors[0];
    //for (const pickerColor of pickerColors) {
      //const hueColor = chroma(pickerColor.hue_color).rgb();

      //const paneColors = [];
      for (let y = 0; y <= 16; y += 1) {
        for (let x = 0; x <= 17; x += 1) {
          const paneIndex = y * 16 + x;
          //if (x % 4 == 0 && y % 4 == 0) {
            console.log("x: " + x + ",y: " + y + "; paneIndex: " + paneIndex + 
            "; hue: " + pickerColor.hue + "; paneColor:" + pickerColor.paneColors[paneIndex].join(','));
          //}
          pickerPaneContext.fillStyle = chroma(pickerColor.paneColors[paneIndex]).hex();
          pickerPaneContext.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);

          /*
          // y controls the luminance/value
          const maxSaturationValue = [];
          for (let c = 0; c < 3; c += 1) {
            let channelValue = hueColor[c] - blackColor[c];
            // this is the pure gradient difference from white of this channel at this x axis.
            channelValue = (channelValue) * (y/16);
            channelValue = hueColor[c] - channelValue;
            maxSaturationValue[c] = channelValue;
          }
          const minSaturationValue = [0,0,0];
          for (let c = 0; c < 3; c += 1) {
            let channelValue = whiteColor[c] - blackColor[c];
            // this is the pure gradient difference from white of this channel at this x axis.
            channelValue = (channelValue) * (y/16);
            channelValue = whiteColor[c] - channelValue;
            minSaturationValue[c] = channelValue;
          }

          // x controls the saturation
          const currentColor = [0,0,0]
          for (let c = 0; c < 3; c += 1) {
            let channelValue = minSaturationValue[c] - maxSaturationValue[c];
            // this is the pure gradient difference from white of this channel at this x axis.
            channelValue = (channelValue) * (x/16);
            channelValue = minSaturationValue[c] - channelValue;
            currentColor[c] = channelValue;
          }

          // get the clamped value.
          const clampedColor = clampColor(currentColor);
          //console.log(clampedColor);

          // paint the value
          pickerPaneContext.fillStyle = clampedColor.hex();
          //pickerPaneContext.fillStyle = chroma(currentColor).hex();
          pickerPaneContext.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
          
          paneColors.push(clampedColor.rgb());

          //console.log('color: ' + chroma(currentColor).rgb() + '; x: ' + x * blockWidth + ', y: '+y * blockHeight);
          */
        //}
      }

      //const newPickerColor = {};
      //newPickerColor.hue = pickerColor.hue_color;
      //newPickerColor.paneColors = paneColors;
      //newPickerColors.push(newPickerColor);
    }

    //console.log(newPickerColors);
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
