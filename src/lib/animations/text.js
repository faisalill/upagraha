import animate from 'animejs';
import { animationStore } from '$lib/stores/animations.js';

let finalState = [
  {position: {x: 0, y: 0, z: 0}},
  {position: {x: 85, y: 25, z: 0}},
  {position: {x: 210, y: 50, z: 0}},
  {position: {x: 295, y: 25, z: 0}},
  {position: {x: 390, y: 0, z: 0}},
  {position: {x: 0, y: -200, z: 0}},
  {position: {x: 95, y: -150, z: 0}},
  {position: {x: 185, y: -120, z: 0}},
  {position: {x: 280, y: -90, z: 0}},
  {position: {x: 375, y: -84, z: 0}},
  {position: {x: 465, y: -120, z: 0}},
  {position: {x: 545, y: -150, z: 0}},
  {position: {x: 630, y: -200, z: 0}},
]; 

let orderOfAnimation = [];

let animated = false;
export function textAnimation(textRef){


  animationStore.subscribe((value) => {
    if(value.isSectionOneSatelliteAnimationDone && !value.isSectionOneTextAnimationDone) {
      if(!animated) {
        animated = true;

      textRef.traverse((child) => {
        if(child.isMesh) {
          orderOfAnimation.push(child);
        }
      })
      
      const duration = 1000;
      const delay = 850;

      var tl = animate.timeline({
        duration: duration,
        easing: 'easeOutExpo',
      })

      tl.add({
        targets: orderOfAnimation[0].position,
        y: finalState[0].position.y,
        x: finalState[0].position.x,
        z: finalState[0].position.z,
        easing: 'easeOutExpo',
      })

      tl.add({
        targets: orderOfAnimation[1].position,
        y: finalState[1].position.y,
        x: finalState[1].position.x,
        z: finalState[1].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[2].position,
        y: finalState[2].position.y,
        x: finalState[2].position.x,
        z: finalState[2].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[3].position,
        y: finalState[3].position.y,
        x: finalState[3].position.x,
        z: finalState[3].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[4].position,
        y: finalState[4].position.y,
        x: finalState[4].position.x,
        z: finalState[4].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[5].position,
        y: finalState[5].position.y,
        x: finalState[5].position.x,
        z: finalState[5].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[6].position,
        y: finalState[6].position.y,
        x: finalState[6].position.x,
        z: finalState[6].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[7].position,
        y: finalState[7].position.y,
        x: finalState[7].position.x,
        z: finalState[7].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[8].position,
        y: finalState[8].position.y,
        x: finalState[8].position.x,
        z: finalState[8].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[9].position,
        y: finalState[9].position.y,
        x: finalState[9].position.x,
        z: finalState[9].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[10].position,
        y: finalState[10].position.y,
        x: finalState[10].position.x,
        z: finalState[10].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[11].position,
        y: finalState[11].position.y,
        x: finalState[11].position.x,
        z: finalState[11].position.z,
        easing: 'easeOutExpo',
      }, `-=${delay}`)

      tl.add({
        targets: orderOfAnimation[12].position,
        y: finalState[12].position.y,
        x: finalState[12].position.x,
        z: finalState[12].position.z,
        easing: 'easeOutExpo',
        complete: () => {
          animationStore.update((value) => {
            value.isSectionOneTextAnimationDone = true;
            return value;
          })
        }
      }, `-=${delay}`)
      }

    }
  })
}

