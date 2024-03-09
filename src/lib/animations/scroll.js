import animate from 'animejs';
import { animationStore } from '$lib/stores/animations.js';

let scroll = 0;
let duration = 400;
let cameraTimelineDuration = 2000;
let textTimeline;
let cameraTimeline;

const cameraPath = [
  { 
    position: [13.267572519471452, 7.276286868171122, -7.689494027374315],
    rotation: [-2.898572493424639, 1.0323659139231625, 2.9318790720125696]
  },
  {
    position: [5.162077538022855, 5.1879704166421075, -9.051253037690108],
    rotation: [-3.072862010449154, 0.549507088347567, 3.1056557591852605]
  },
  {
    position: [3.7387578370823684, 3.4206342854209972, -1.194163462652054],
    rotation: [3.032270084910241, 0.9318499201498738, -3.0537123980555974],
  }
]

export function scrollAnimationInit(window, document, satelliteRef, cameraRef, sceneRe, textRef) {

  textTimeline= animate.timeline({
    easing: 'easeInExpo',
    duration: duration,
    autoplay: false
  })

  cameraTimeline = animate.timeline({
    easing: 'easeInExpo',
    duration: cameraTimelineDuration,
    autoplay: false
  })

  const scrollContainer = document.getElementById('scroll-container')

  window.addEventListener('scroll', () =>{
      scroll= window.scrollY / (scrollContainer.clientHeight - window.innerHeight);

      if(textTimeline) {
        textTimeline.seek(textTimeline.duration * scroll);
      }
      if(cameraTimeline) {
        cameraTimeline.seek(cameraTimeline.duration * scroll);
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

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[0].position[0],
        y: cameraPath[0].position[1],
        z: cameraPath[0].position[2],
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[0].rotation[0],
        y: cameraPath[0].rotation[1],
        z: cameraPath[0].rotation[2],
      }, `-=${cameraTimelineDuration}`)

      textTimeline.add({
        targets: textRefs[12].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[11].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[10].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[9].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[8].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[7].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[6].position,
        y: -2000,
      })

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[1].position[0],
        y: cameraPath[1].position[1],
        z: cameraPath[1].position[2],
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[1].rotation[0],
        y: cameraPath[1].rotation[1],
        z: cameraPath[1].rotation[2],
      }, `-=${cameraTimelineDuration}`)

      textTimeline.add({
        targets: textRefs[5].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[4].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[3].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[2].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[1].position,
        y: -2000,
      })

      textTimeline.add({
        targets: textRefs[0].position,
        y: -2000,
      })

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[2].position[0],
        y: cameraPath[2].position[1],
        z: cameraPath[2].position[2],
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[2].rotation[0],
        y: cameraPath[2].rotation[1],
        z: cameraPath[2].rotation[2],
      }, `-=${cameraTimelineDuration}`)
    }
  })
} 
