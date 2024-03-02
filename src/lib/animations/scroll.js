import { animationStore } from '$lib/stores/animations.js';
import { scroll } from '$lib/stores/pages.js';


export function scrollAnimationInit(window) {

  window.addEventListener('scroll', () =>{
    $position = $scroll.scrollY * $length;
    console.log("This is working");
  }) 

  animationStore.subscribe((value) => {
    if (value.isSectionOneTextAnimationDone && !value.isScrollAnimationDone) {
      console.log("Run")
    }
  })
} 
