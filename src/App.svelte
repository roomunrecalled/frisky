<script lang="ts">
  import WorkWindow from './lib/WorkWindow.svelte';
  import FriskyEditor from './lib/editor/editor';

  const editor = new FriskyEditor();
  console.log(editor);
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
