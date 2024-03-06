import animate from 'animejs';
import { animationStore } from '$lib/stores/animations.js';

let scroll = 0;
let timeline;

export function scrollAnimationInit(window, document, satelliteRef, cameraRef, sceneRe, textRef) {

  timeline = animate.timeline({
    easing: 'easeInExpo',
    duration: 400,
    autoplay: false
  })

  const scrollContainer = document.getElementById('scroll-container')

  window.addEventListener('scroll', () =>{
      scroll= window.scrollY / (scrollContainer.clientHeight - window.innerHeight);

      if(timeline) {
        timeline.seek(timeline.duration * scroll);
      }
  }) 

  animationStore.subscribe((value) => {
    if (value.isSectionOneTextAnimationDone && !value.isScrollAnimationDone) {
       let textRefs = []

       textRef.traverse((child) => {
        if (child.isMesh) {
          textRefs.push(child)
        }
      })

      timeline.add({
        targets: textRefs[12].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[11].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[10].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[9].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[8].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[7].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[6].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[5].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[4].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[3].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[2].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[1].position,
        y: -2000,
      })

      timeline.add({
        targets: textRefs[0].position,
        y: -2000,
      })
    }
  })
} 
