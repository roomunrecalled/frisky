<script>
  import { gameStore, referenceGame } from '../editor/editor_store';

  let referenceTiles = $referenceGame.tiles;
  let tiles;

  gameStore.subscribe(game => {
    tiles = game['tiles'].slice(0);
  });

  function addTile() {
    gameStore.updateData({
      data_type: 'tiles',
      change_type: 'add',
      value: {
        name: 'new tile',
        data: referenceTiles[0].data.slice(0),
        is_solid: false
      }
    })
  }

</script>

{#each tiles as tile}
  <h1>{tile.id}</h1>
{/each}

<button on:click={addTile}></button>