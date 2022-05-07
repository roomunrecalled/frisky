<script lang="ts">
  import WorkWindow from './lib/WorkWindow.svelte';
  import starter_game from './assets/starter_game.json'

  console.log(starter_game);
</script>

<main>
  <WorkWindow />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
  }
</style>
