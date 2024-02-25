<script>
  import App from '$lib/components/App.svelte'
  import { onMount } from 'svelte';
  import { scroll } from '$lib/stores/pages.js'

  onMount(() => {
    const scrollContainer = document.getElementById('scroll-container')

    scrollContainer.style.height = `${window.innerHeight * $scroll.pages}px`; 

    window.addEventListener('scroll', () => {
      $scroll.scrollY = window.scrollY / (scrollContainer.clientHeight - window.innerHeight);
    })
  })
</script>

<div class="canvas">
  <App />
</div>
<div class="scroll-container" id="scroll-container">
</div>

<style>
  :global(body) {
    margin: 0;
  }
  .canvas {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0);
    overflow-x: hidden;
  }
  .scroll-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
  }
</style>
