<script>
  import App from '$lib/components/App.svelte'
  import { onMount } from 'svelte';
  import { scroll } from '$lib/stores/pages.js'
  import { useProgress } from '@threlte/extras';

  const { progress } = useProgress();

  onMount(() => {
    const scrollContainer = document.getElementById('scroll-container')

    scrollContainer.style.height = `${window.innerHeight * $scroll.pages}px`; 

    window.addEventListener('scroll', () => {
      $scroll.scrollY = window.scrollY / (scrollContainer.clientHeight - window.innerHeight);
    })
  })
</script>

{#if $progress > 1 }
  <h1 class="loader"> Loading... </h1>
{:else} 
  <div class="canvas">
    <App />
  </div>
  <div class="scroll-container" id="scroll-container">
  </div>
{/if}

<div class="info">
  <h2>Title</h2>
  <p> Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis. </p>
</div>

<style>
  @font-face {
    font-family: "originTech";
    src: url("/fonts/PERFORMANCE.ttf") format("truetype");
  }

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
  .loader {
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
/*https://codesandbox.io/p/sandbox/sci-fi-card-3-nof2e*/
  .info {
    position: fixed;
    z-index: 2;
    padding: 10px;
    background-image: linear-gradient(rgba(0, 255, 255, 0.35), rgba(0, 255, 255, 0.20));
    background-repeat: no-repeat;
    display: inline-block;
    -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 255, 255, 0.8));
    filter: drop-shadow(5px 5px 5px rgba(0, 255, 255, 0.8));
    border: 2px solid cyan;
    border-radius: 20px 20px 20px 20px;
    width: 50%;
  }
  .info h2{
    text-align: center;
    color: rgb(0, 255, 255);
    font-size: 40px;
    letter-spacing: 4px;
    font-family: "originTech";
  }
  .info p{
    text-align: center;
    color: rgba(0, 255, 255, 0.9);
    font-family: "originTech";
  }
</style>
