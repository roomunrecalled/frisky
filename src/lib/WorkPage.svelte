<script>
  export let onLeft = false;
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = value => () => (activeTabValue = value);
</script>

<div class={onLeft ? 'layout on_left' : 'layout on_right'}>
  <div class={onLeft ? 'tabs on_left' : 'tabs on_right'}>
    <ul>
      {#each items as item}
        <li class={activeTabValue === item.value ? 'active' : ''} >
          <span on:click={handleClick(item.value)}>{item.label}</span>
        </li>
      {/each}
    </ul>
  </div>

  <div class={onLeft ? 'box on_left' : 'box on_right'}>
  {#each items as page}
    {#if activeTabValue === page.value}
      <svelte:component this={page.component}/>
    {/if}
  {/each}
  </div>
</div>

<style>
  .layout {
    display: flex;
    min-height: 360px;
  }
  .layout.on_left {
    flex-direction: row;
  }
  .layout.on_right {
    flex-direction: row-reverse;
  }
  .box {
    border: 1px solid #000;
    border-radius: .25rem;
    min-width: 240px;
    width: calc(100% - 76px);
    padding: 1em 0em;
  }
  .box.on_left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }
  .box.on_right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }

  .tabs {
    width: 70px;
  }

  .tabs.on_left {
    margin-left: 2px;
    border-right: 1px solid #000;
  }
  .tabs.on_right {
    margin-right: 2px;
    border-left: 1px solid #000;
  }

  ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .on_left ul {
    justify-content: flex-start;
  }
  .on_right ul {
    justify-content: flex-end;
  }

  .on_left li {
    margin-right: -1px;
  }
  .on_right li {
    margin-left: -1px;
  }

  span {
    border: 1px solid transparent;
    border-left: 0px;
    border-right: 0px;
    display: block;
    padding: 0.2rem 0.1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #ccc;
  }

  li.active {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }

  .tabs.on_left li.active {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
    border-left: 1px solid #000;
    border-right: 2px solid #fff;
  }
  .tabs.on_right li.active {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
    border-right: 1px solid #000;
    border-left: 2px solid #fff;
  }

</style>
