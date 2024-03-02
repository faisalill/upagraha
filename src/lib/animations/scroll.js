import animate from 'animejs';
import { animationStore } from '$lib/stores/animations.js';

let scroll = 0;
let timeline;

export function scrollAnimationInit(window, document, satelliteRef, cameraRef, sceneRef) {

  const scrollContainer = document.getElementById('scroll-container')

  window.addEventListener('scroll', () =>{
      scroll= window.scrollY / (scrollContainer.clientHeight - window.innerHeight);

      if(timeline) {
        timeline.seek(timeline.duration * scroll * 10);
      }
  }) 

  animationStore.subscribe((value) => {
    if (value.isSectionOneTextAnimationDone && !value.isScrollAnimationDone) {
       timeline = animate.timeline({
        duration: 2000,
        autoplay: false
      }) 

      timeline.add({
        targets: cameraRef.position,
        x: 0, 
        y: 0,
        z: 0,
        duration: 2000,
        easing: 'easeInOutSine',
      })

    }
  })
} 
