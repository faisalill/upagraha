<script>
  import App from '$lib/components/App.svelte'
  import { onMount } from 'svelte';
  import { scroll } from '$lib/stores/pages.js'
  import { useProgress } from '@threlte/extras';
  import animate from 'animejs';

  const { progress, item } = useProgress();

  let loadingPercentage = 0;

  onMount(() => {
    const scrollContainer = document.getElementById('scroll-container')
    scrollContainer.style.height = `${window.innerHeight * $scroll.pages}px`; 

    const progressBar = document.getElementById('progress-bar')
    progress.subscribe((value) => {
      progressBar.style.width = `${value * 70}vw`;
    })

    window.addEventListener('scroll', () => {
      $scroll.scrollY = window.scrollY / (scrollContainer.clientHeight - window.innerHeight);
    })

  })

  function trimToNineLetters(str) {
      if(str) {
        return str.length > 25 ? str.substring(0, 25) : str;
      }
  }

</script>

<div class="canvas">
  <App />
</div>
<div class="scroll-container" id="scroll-container">
</div>

<div class="info">
  <h2>Title</h2>
  <p> Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis. </p>
</div>

<div class="intro">
  {#if $progress < 1} 
    <div class="loader-wrapper">
      <div class="loader">
        <h1> Loading <span class="loading-percentage">{$progress.toFixed(1) * 100}</span> % </h1>
        <h2> Currently Processing: <span class="loading-model">{trimToNineLetters($item)}...</span> <h2>
        <div class="progress-bar-bg"></div>
        <div class="progress-bar" id="progress-bar"></div>
      </div>
    </div>
  {:else}
    <div class="loader-wrapper">
      <div class="loader">
        <h1> Loading <span class="loading-percentage">{$progress.toFixed(1) * 100}</span> % </h1>
        <h2> Currently Processing: <span class="loading-model">{trimToNineLetters($item)}...</span> <h2>
        <div class="progress-bar-bg"></div>
        <div class="progress-bar" id="progress-bar"></div>
      </div>
    </div>
    <!-- <h1> -->
    <!--  Intro Scene  -->
    <!-- </h1> -->
  {/if}
</div>

<style>
  @font-face {
    font-family: "originTech";
    src: url("/fonts/PERFORMANCE.ttf") format("truetype");
  }

  :global(body) {
    margin: 0;
    background: black;
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
    scale: 0;
  }
  .scroll-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
  }
  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    align-content: center;
  }
  .loading-percentage {
    position: relative;
    top: 10px;
    color: rgb(255, 0, 0);
  }
  .loading-model {
    color: rgb(255, 0, 0);
  }
  .loader h1 {
    font-family: "originTech";
    font-size: 5rem;
    color: rgba(0, 255, 255, 1.0);
  }
  .loader h2{
    font-family: "originTech";
    color: rgba(255, 0, 0, 0.7);
    position: relative;
    bottom: 20px;
    color: rgba(0, 255, 255, 0.75);
  }
  .loader .progress-bar-bg {
    width: 70vw;
    height: 20px;
    background: black;
    transform: skew(30deg, 0deg);
  }
  .loader .progress-bar {
    position: relative;
    bottom: 20px;
    height: 20px;
    background: rgba(0, 255, 255, 1.0);
    transform: skew(30deg, 0deg);
  }
/*https://codesandbox.io/p/sandbox/sci-fi-card-3-nof2e*/
  .info {
    position: fixed;
    top: -150%;
    left: 1%;
    z-index: 2;
    padding: 10px;
    background-image: linear-gradient(rgba(0, 255, 255, 0.35), rgba(0, 255, 255, 0.20));
    background-repeat: no-repeat;
    display: inline-block;
    -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 255, 255, 0.8));
    filter: drop-shadow(5px 5px 5px rgba(0, 255, 255, 0.8));
    border: 2px solid cyan;
    border-radius: 20px 20px 20px 20px;
    width: 35%;
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
    color: rgb(0, 255, 255);
    font-weight: bold;
    font-family: "Sans Serif";
  }
  .intro {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }
</style>
