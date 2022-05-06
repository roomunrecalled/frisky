<script>
  import WorkPage from './pages/WorkPage.svelte';

  import AboutPage from './pages/AboutPage.svelte';
  import FriskyPreview from './pages/FriskyPreview.svelte';
  import RoomPage from './pages/RoomPage.svelte';

  import PalettePage from './pages/PalettePage.svelte';
  import BackdropPage from './pages/BackdropPage.svelte';
  import TilePage from './pages/TilePage.svelte';
  import SpritePage from './pages/SpritePage.svelte';
  import PortraitPage from './pages/PortraitPage.svelte';

  import ActorsPage from './pages/ActorsPage.svelte';
  import ScriptsPage from './pages/ScriptsPage.svelte';

  const pages = [
    {
      label: 'Room',
      color: '#eac',
      component: RoomPage
    },
    {
      label: 'Palette',
      color: '#cec',
      component: PalettePage
    },
    {
      label: 'Backdrop',
      color: '#ecd',
      component: BackdropPage
    },
    {
      label: 'Tiles',
      color: '#dde',
      component: TilePage
    },
    {
      label: 'Sprites',
      color: '#dee',
      component: SpritePage
    },
    {
      label: 'Portraits',
      color: '#cde',
      component: PortraitPage
    },
    {
      label: 'Actors',
      color: '#dea',
      component: ActorsPage
    },
    {
      label: 'Scripts',
      color: '#cae',
      component: ScriptsPage
    }
  ];

  const left_pages = pages.slice(0);
  left_pages.unshift({
    label: 'Frisky',
    color: '#fff',
    component: AboutPage
  });
  const right_pages = pages.slice(0);
  right_pages.unshift({
    label: 'Game',
    color: '#ddd',
    component: FriskyPreview
  });
</script>

<div class='pages'>
  <div class='page left_page'>
    <WorkPage onLeft={true} items={left_pages} />
  </div>
  <div class='page right_page'>
    <WorkPage onLeft={false} items={right_pages} />
  </div>
</div>


<style>
  .pages {
    display: flex; 
    margin: 20px 0;
    padding: 10px;
  }
  div.page {
    width: 30vw;
  }
</style>
