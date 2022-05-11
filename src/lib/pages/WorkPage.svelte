<script>
  export let onLeft = false;
  export let items = [];
  export let activeTabValue;

  items.map((item, index) => { item.value = index; });
  const handleClick = value => () => (activeTabValue = value);
</script>

<div class='layout {onLeft ? 'on_left' : 'on_right'}'>
  <div class='tabs {onLeft ? 'on_left' : 'on_right'}'>
    <ul>
      {#each items as item}
        <li class={activeTabValue === item.value ? 'active' : ''} >
          <span on:click={handleClick(item.value)}
                style='background-color: {item.color};
                      border-{onLeft ? 'right' : 'left'}: 4px 
                        {activeTabValue === item.value ? 'solid' : 'transparent'} 
                        {item.color};
                      {onLeft && item.value === 0 ? 'font-weight: bold' : ''}' >
            {item.label}
          </span>
        </li>
      {/each}
    </ul>
  </div>

  <div class='box {onLeft ? 'on_left' : 'on_right'}'
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
    height: 400px;
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
    width: calc(100% - 85px);
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
    width: 80px;
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
    border-color: #eee8;
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
