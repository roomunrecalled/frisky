<script>
  import WorkPage from './pages/WorkPage.svelte';

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
      label: 'Game',
      color: '#eee',
      component: FriskyPreview
    },
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
</script>

<div class='page left_page'>
  <WorkPage onLeft={true} items={left_pages} />
</div>
<div class='page right_page'>
  <WorkPage onLeft={false} items={pages} />
</div>

<style>
  div.page {
    padding: 1% 0%;
    position: fixed;
    top: 0;
    width: 50%;
  }
  .left_page {
    left: 0;
  }
  .right_page {
    right: 0;
  }
</style>
