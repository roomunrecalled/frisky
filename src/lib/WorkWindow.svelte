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
      label: 'Rooms',
      color: '#7ad',
      component: RoomPage
    },
    {
      label: 'Palettes',
      color: '#4b9',
      component: PalettePage
    },
    {
      label: 'Backdrops',
      color: '#9df',
      component: BackdropPage
    },
    {
      label: 'Tiles',
      color: '#ed8',
      component: TilePage
    },
    {
      label: 'Sprites',
      color: '#bc3',
      component: SpritePage
    },
    {
      label: 'Portraits',
      color: '#aa0',
      component: PortraitPage
    },
    {
      label: 'Actors',
      color: '#e86',
      component: ActorsPage
    },
    {
      label: 'Scripts',
      color: '#fab',
      component: ScriptsPage
    }
  ];

  const left_pages = pages.slice(0);
  left_pages.unshift({
    label: 'FRISKY',
    color: '#fff',
    component: AboutPage
  });
  const right_pages = pages.slice(0);
  right_pages.unshift({
    label: 'Game',
    color: '#ddd',
    component: FriskyPreview
  });

  let activeLeftTab = 0;
  let activeRightTab = 0;
</script>

<div class='pages'>
  <div class='page left_page'>
    <WorkPage 
      onLeft={true} 
      items={left_pages} 
      activeTabValue={activeLeftTab} />
  </div>
  <div class='page right_page'>
    <WorkPage 
      onLeft={false} 
      items={right_pages} 
      activeTabValue={activeRightTab} />
  </div>
</div>

<style>
  .pages {
    display: flex; 
    margin: 20px 0;
    padding: 10px;
  }
  div.page {
    width: 480px;
    margin: 0 12px;
  }
</style>
