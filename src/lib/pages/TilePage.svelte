<script>
  import { gameStore, referenceGame } from '../editor/editor_store';

  let referenceTiles = $referenceGame.tiles;
  let tiles = $gameStore.tiles.map(tile => {return {...tile}});

  let currentTileId = tiles[0].id;

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

  function changeTile(event) {
    const targetId = event.target.id;
    const [id, field] = targetId.split('-');
    const value = event.target.value;

    console.log($gameStore);

    const update = {
      id,
      data_type: 'tiles',
      change_type: 'modify',
      field,
      value
    }
    gameStore.updateData(update);
  }

</script>

<div>
  {#each tiles as tile}
    {#if currentTileId === tile.id}
      <b>Name:</b> 
      <input  id={tile.id + '-name'}
              on:input={changeTile} bind:value={tile.name}>
      <br>
      <b>Is Solid:</b> 
      <input  id={tile.id + '-is_solid'}
              on:change={changeTile} type=checkbox bind:checked={tile.is_solid}>
    {/if}
  {/each}
</div>

<style>
  div {
    padding-left: 10px;
    text-align: left;
  }

</style>
