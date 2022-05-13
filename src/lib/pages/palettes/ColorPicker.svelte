<script>
  import chroma from 'chroma-js';
  import pickerColors from './picker_colors.json';
  import { createEventDispatcher, onMount } from 'svelte';

  export let onLeft = false;

  const dispatch = createEventDispatcher();
  let pickerPane, hueSliderBg, pickerPaneContext, hueSliderPicker;
  let [paneX, paneY] = [0,0]

  const [paneWidth, paneHeight] = [204, 136];
  const [blockWidth, blockHeight] = [paneWidth/17, paneHeight/17];

  let [currentHue, currentColor] = [pickerColors[0], chroma(pickerColors[0].hue)]

  function setColor(rgbColor) {
    const newColor = chroma(rgbColor);
    const hue = chroma(Math.round(newColor.get('hsv.h')), 1, 1, 'hsv');
    const hueIndex = pickerColors.findIndex(
      (pickerColor) => pickerColor.hue === hue.hex());
    const newHue = pickerColors[hueIndex];
    console.log(pickerColors[hueIndex])
    const colorIndex = newHue.paneColors.findIndex(
      (paneColor) => {
        return paneColor[0] === newColor.rgb()[0] && 
                paneColor[1] === newColor.rgb()[1] && 
                paneColor[2] === newColor.rgb()[2]
      });
    console.log(`hue: ${hue}; hueIndex: ${hueIndex}; colorIndex: ${colorIndex}; newColor: ${newColor.rgb()}`);

    const quotient = Math.floor(colorIndex/17);
    paneY = quotient * blockHeight + 5;
    paneX = (colorIndex % 17) * blockWidth + 10;
    console.log(`(${paneX},${paneY})`)
    currentHue = newHue;
    hueSliderPicker.style.left = `${Math.min(268, hueIndex * 3 - 2)}px`;
    updateColorPicker();
  }

  function updatePos(newPos) {
    paneX = newPos[0];
    paneY = newPos[1];
    updateColorPicker();
  }

  function setHue(pickerColorHue) {
    currentHue = pickerColorHue;
    updateColorPicker();
  }

  function updateColorPicker() {
    drawColorPickerPane();
    updateColor();
    drawColorPickerCircle();
    //dispatch('color_picker_change', { rgbColor: chroma(currentColor).rgb(), isMouseUp: true });
  }

  function drawColorPickerPane() {
    pickerPaneContext.clearRect(0, 0, paneWidth, paneHeight);

    // draw the color pane
    const pickerColor = currentHue;
    for (let y = 0; y <= 16; y += 1) {
      for (let x = 0; x <= 16; x += 1) {
        const paneIndex = y * 17 + x;
        pickerPaneContext.fillStyle = chroma(pickerColor.paneColors[paneIndex]).hex();
        pickerPaneContext.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
    }
  }
  function drawColorPickerCircle() {
    pickerPaneContext.beginPath();
    pickerPaneContext.strokeStyle = currentColor.hsv()[2] > .5 ? '#000' : '#FFF';
    pickerPaneContext.arc(paneX-1, paneY-1, 5, 0, Math.PI * 2);
    pickerPaneContext.stroke();
  }

  // this flag is updated by inline event listeners on the slider
  let selectingHue = false;
  function pickHueMove(event) {
    if (selectingHue) {
      const leftOffset = Math.max(0,event.pageX - hueSliderBg.offsetLeft);
      setHue(pickerColors[Math.min(89, Math.floor(leftOffset/3))]);

      if (hueSliderPicker) {
        hueSliderPicker.style.left = `${Math.min(268, leftOffset - 2)}px`;
      }
    }
  }
  // this flag is updated by inline event listeners on the color pane
  let selectingColor = false;
  function pickColorMove(event) {
    if (selectingColor) {
      const bounds = pickerPane.getBoundingClientRect();
      const container = [
        Math.min(event.clientX - bounds.left, paneWidth-1),
        Math.min(event.clientY - bounds.top, paneHeight-1)];

      updatePos(container);
    }
  }

  function updateColor() {
      const pixelData = pickerPaneContext.getImageData(paneX, paneY, 1, 1).data;
      currentColor = chroma({r: pixelData[0], g: pixelData[1], b: pixelData[2]});
  }

  onMount(() => {
    pickerPane.width = paneWidth;
    pickerPane.height = paneHeight;
    pickerPaneContext = pickerPane.getContext("2d");

    setHue(pickerColors[0]);
  });
</script>

<div>
  <div class='picker-top'>
    <div class='{onLeft ? 'left' : 'right'} colorPreview'
        style='background-color: {currentColor.hex()}'></div>
    <canvas class='{onLeft ? 'left' : 'right'} colorPane'
            on:mousedown={(event) => { selectingColor = true; pickColorMove(event); }}
            on:mouseup={() => { selectingColor = false;}}
            on:mousemove={pickColorMove}
            on:mouseleave={() => { selectingColor = false;}}
            bind:this={pickerPane}></canvas>
  </div>
  <div  class='hue-slider-bg'
        on:mousedown={() => { selectingHue = true; }} 
        on:mouseup={() => { selectingHue = false; }}
        on:mousemove={pickHueMove} 
        on:mouseleave={() => { selectingHue = false; }}
        bind:this={hueSliderBg} >
    <div  class='slider-picker' bind:this={hueSliderPicker}></div>
  </div>
</div>

<button on:click={() => setColor([17,238,0])}>TestButton</button>

<style>
  .colorPane {
    float: right;
    display: block;
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
