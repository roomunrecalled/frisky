<script>
  import FriskyPreview from './pages/FriskyPreview.svelte';
  import Counter from './Counter.svelte';
  import WorkPage from './WorkPage.svelte';

  let pages = [
    { 
      label: 'Preview',
      value: 1,
      component: FriskyPreview
    },
    {
      label: 'Counter',
      value: 2,
      component: Counter
    }
  ]
</script>

<div class='page left_page'>
  <WorkPage onLeft={true} items={pages} />
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
