<script>
  export let onLeft = false;
  export let items = [];
  export let activeTabValue = 0;

  items.map((item, index) => { item.value = index; });
  if (onLeft) activeTabValue = 1;
  const handleClick = value => () => (activeTabValue = value);
</script>

<div class={onLeft ? 'layout on_left' : 'layout on_right'}>
  <div class={onLeft ? 'tabs on_left' : 'tabs on_right'}>
    <ul>
      {#if onLeft} <li><span style='border: 0;'><b>FRISKY</b></span></li> {/if}
      {#each items as item}
        {#if !onLeft || item.value !== 0}
          <li class={activeTabValue === item.value ? 'active' : ''} >
            <span on:click={handleClick(item.value)}
                  style='background-color: {item.color};
                        {onLeft ? 'border-right' : 'border-left'}: 4px 
                          {activeTabValue === item.value ? 'solid' : 'transparent'} 
                          {item.color}' >
              {item.label}
            </span>
          </li>
        {/if}
      {/each}
    </ul>
  </div>

  <div class={onLeft ? 'box on_left' : 'box on_right'}
       style='background-color: {items[activeTabValue].color};'>
  {#each items as item}
    {#if activeTabValue === item.value}
      <svelte:component this={item.component}/>
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
    border: 2px solid #000;
    border-radius: .25rem;
    min-width: 240px;
    width: calc(100% - 80px);
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
    padding-right: 1px;
    border-right: 2px solid #000;
  }
  .tabs.on_right {
    margin-right: 2px;
    padding-left: 1px;
    border-left: 2px solid #000;
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
    border: 2px solid transparent;
    border-left: 0px;
    border-right: 0px;
    display: block;
    padding: 0.2rem 0.1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #bbb;
  }

  li.active {
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
  }

  .tabs.on_left li.active {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
    border-left: 2px solid #000;
    margin-right: -3px;
  }
  .tabs.on_right li.active {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
    border-right: 2px solid #000;
    margin-left: -3px;
  }
</style>
