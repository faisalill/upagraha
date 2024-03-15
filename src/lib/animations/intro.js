import { animationStore } from '$lib/stores/animations.js';
import animate from 'animejs';

const initialCameraState = {
  position: 
    {
      "x": 12.27243250935472,
      "y": 4.034611469560477,
      "z": 1.22556820438941
    },
  rotation: 
    {
      "isEuler": true,
      "_x": 0.6735293378523349,
      "_y": 1.4870563471297482,
      "_z": -0.6718186058336377,
      "_order": "XYZ"
    }
}

const finalSceneState = {
"discovery_emission_2": {
    x: 0, 
    y: -0.048,
    z: 0.035
  },
  "discovery_propeller_emission_2": {
    x: 0, 
    y: 0,
    z: 0.01
  },
  "stars_2": {
    x: 1.5,
    y: 0,
    z: 0
  } 
};


let animated = false;
export function introAnimation(satelliteRef, sceneRef, cameraRef) {
  cameraRef.position.x = initialCameraState.position.x;
  cameraRef.position.y = initialCameraState.position.y;
  cameraRef.position.z = initialCameraState.position.z;
  cameraRef.rotation.x = initialCameraState.rotation._x;
  cameraRef.rotation.y = initialCameraState.rotation._y;
  cameraRef.rotation.z = initialCameraState.rotation._z;

  satelliteRef.position.y = 20;

  // initial scale
  sceneRef.scale.x = 0;
  sceneRef.scale.y = 0;
  sceneRef.scale.z = 0;

  animationStore.subscribe((value) => {
    if(value.transitionToIntro && !animated){
      animated = true;
      animate({
        targets: sceneRef.scale,
        x: 3, 
        y: 3, 
        z: 3,
        easing: 'spring(3, 50, 7, 10)',
        duration: 2000,
        complete: () => {
          animationStore.update((value) => {
            return {
              ...value,
              isIntroDone: true
            }
          })
        }
      })
    }
  })  

}
