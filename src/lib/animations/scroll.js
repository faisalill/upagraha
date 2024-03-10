import animate from 'animejs';
import { animationStore } from '$lib/stores/animations.js';
import { Color, DoubleSide } from 'three';
import HolographicMaterial from '$lib/materials/HolographicMaterial.js';

const holographicMaterial = new HolographicMaterial({
  fresnelAmount: 1.0,
  fresnelOpacity: 1.0,
  hologramBrightness: 9.2,
  scanlineSize: 8,
  signalSpeed: 0.45,
  hologramColor: "#00d5ff",
  hologramOpacity: 0.01,
  blinkFresnelOnly: true,
  enableBlinking: true,
  enableAdditive: true,
  side: DoubleSide,
});

let scroll = 0;
let duration = 400;
let cameraTimelineDuration = 2000;
let textTimeline;
let cameraTimeline;

const cameraPath = [
  {
    position: {
    "x": 3.015974526392603,
    "y": 3.2351878949386097,
    "z": -1.225052308081005
},
    rotation: {
    "isEuler": true,
    "_x": 2.9190687923491523,
    "_y": 0.8246167284790666,
    "_z": -2.9769486704846746,
    "_order": "XYZ"
},
  }, 
  {
    position: {
    "x": 2.6708053891999253,
    "y": 4.894756638793814,
    "z": 1.512646336864094
},
    rotation:{
    "isEuler": true,
    "_x": -0.9774093529283726,
    "_y": 1.0088384546966944,
    "_z": 0.8978584031850461,
}  
},
  {
    position: {
    "x": 1.8781494466225288,
    "y": 4.5408065066089565,
    "z": 0.505516556912562
},
    rotation: {
    "isEuler": true,
    "_x": -1.7689573450782217, "_y": 1.1725379298652117,
    "_z": 1.785290425453865,
    "_order": "XYZ"
}
  },
  {
    position: {
    "x": 0.09037092976397582,
    "y": 5.800064799582229,
    "z": 1.5880996629760686
},
    rotation: {
    "isEuler": true,
    "_x": -0.8086569172363095,
    "_y": 0.11265120207844291,
    "_z": 0.11722781219368886,
    "_order": "XYZ"
}
  },
  {
    position: {
    "x": -0.5225821616995961,
    "y": 6.056869511612841,
    "z": -1.5403945356673012
},
    rotation: {
    "isEuler": true,
    "_x": -2.23977799088368,
    "_y": -0.0787690076974659,
    "_z": -3.04239017123939,
    "_order": "XYZ"
}
  },
  {
    position: {
    "x": 1.11948877857054,
    "y": 9.064445230150925,
    "z": 3.425745259908542
},
    rotation: {
    "isEuler": true,
    "_x": -1.238397739844181,
    "_y": 0.40312527601606835,
    "_z": 0.8491594791420177,
    "_order": "XYZ"
}
  },
  {
    position: {
    "x": 6.414670086311794,
    "y": 5.919290210996387,
    "z": 1.079561775876595
},

    rotation: {
    "isEuler": true,
    "_x": -1.5632631233123888,
    "_y": 1.3109715271006988,
    "_z": 1.5630015000532327,
    "_order": "XYZ"
}
  },
]

const cyan = new Color( 'cyan' );

function strip(ref) {
  ref.children[0].visible = true;
  ref.children[0].material.color = cyan;
  ref.material.transparent = true;
  animate({
    targets: ref.material,
    opacity: 0,
    duration: 1000,
    easing: 'linear',
  })

}

export function scrollAnimationInit(window, document, satelliteRef, cameraRef, sceneRef, textRef) {

  textTimeline= animate.timeline({
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: duration,
    autoplay: false
  })

  cameraTimeline = animate.timeline({
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: cameraTimelineDuration,
    autoplay: false
  })

  const scrollContainer = document.getElementById('scroll-container')

  window.addEventListener('scroll', () =>{
      const splitRatio = 4;
      const height = scrollContainer.clientHeight - window.innerHeight;
      const splitHeight = height / splitRatio;
      scroll = window.scrollY / height;
      const textScroll = window.scrollY / splitHeight;

      const cameraScroll = ( (window.scrollY - splitHeight) / (height - splitHeight));

      if(textTimeline) {
        textTimeline.seek(textTimeline.duration * textScroll);
      }
      if(cameraTimeline) {
        cameraTimeline.seek(cameraTimeline.duration * cameraScroll);
      }
  }) 

  animationStore.subscribe((value) => {
    if (value.isSectionOneTextAnimationDone && !value.isScrollAnimationDone) {
       let textRefs = [];
       let sceneRefs = {};
       let satelliteRefs = {};

       textRef.traverse((child) => {
        if (child.isMesh) {
          textRefs.push(child)
        }
      })

       sceneRef.traverse((child) => {
        if (child.isMesh) {
          sceneRefs[`${child.name}`] = child;
        }
      })

      satelliteRef.traverse((child) => {
        if (child.isMesh) {
          satelliteRefs[`${child.name}`] = child;
        }
      })


      textTimeline.add({
        targets: textRefs[12].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.sixth_plane)
        }
      })

      textTimeline.add({
        targets: textRefs[11].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.fifth_plane)
          strip(sceneRefs.stars_1)
        }
      })

      textTimeline.add({
        targets: textRefs[10].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.fourth_plane)
          strip(sceneRefs.stars_2)
        }
      })

      textTimeline.add({
        targets: textRefs[9].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.third_plane)
        }
      })

      textTimeline.add({
        targets: textRefs[8].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.second_plane)
        }
      })

      textTimeline.add({
        targets: textRefs[7].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.first_plane)
        }
      })

      textTimeline.add({
        targets: textRefs[6].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.planet_two)
          strip(sceneRefs.discovery_emission_1)
          strip(sceneRefs.discovery_emission_2)
          strip(sceneRefs.discovery_propeller_emission_1)
          strip(sceneRefs.discovery_propeller_emission_2)
          strip(sceneRefs.discovery_black_body)
          strip(sceneRefs.discovery_white_body)
          strip(sceneRefs.discovery_propeller_orange_shaft)
          strip(sceneRefs.discovery_propeller_yellow_tanks)
        }
      })

      textTimeline.add({
        targets: textRefs[5].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.shooting_star)
          strip(sceneRefs.shooting_star_trajectory)
          strip(sceneRefs.shooting_star_emission)
          strip(sceneRefs.planet_four)
        }
      })

      textTimeline.add({
        targets: textRefs[4].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.planet_three)
        }
      })

      textTimeline.add({
        targets: textRefs[3].position,
        y: -2000,
        complete: () => {
        }
      })

      textTimeline.add({
        targets: textRefs[2].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.planet_one)
        }
      })

      textTimeline.add({
        targets: textRefs[1].position,
        y: -2000,
        complete: () => {
          strip(sceneRefs.planet_five)
          strip(sceneRefs.sputnik_black_body)
          strip(sceneRefs.sputnik_yellow_body)
          strip(sceneRefs.sputnik_white_body)
        }
      })

      textTimeline.add({
        targets: textRefs[0].position,
        y: -2000,
        complete: () => {
          strip(satelliteRefs.MCU_1)
          strip(satelliteRefs.MCU_2)
          strip(satelliteRefs.battery_cells)
          strip(satelliteRefs.battery_holder)
          strip(satelliteRefs.battery_plate)
          strip(satelliteRefs.magnetometer_1)
          strip(satelliteRefs.magnetometer_1_handle)
          strip(satelliteRefs.magnetometer_2)
          strip(satelliteRefs.magnetometer_2_handle)
          strip(satelliteRefs.magnetorquer_1)
          strip(satelliteRefs.magnetorquer_2)
          strip(satelliteRefs.mid_panels)
          strip(satelliteRefs.payload_knob)
          strip(satelliteRefs.payload_lens)
          strip(satelliteRefs.payload_pins)
          strip(satelliteRefs.payload_body)
          strip(satelliteRefs.solar_panel_left)
          strip(satelliteRefs.solar_panel_right)
          strip(satelliteRefs.side_panel)
          strip(satelliteRefs.top_panel)
          strip(satelliteRefs.thin_panel_1)
          strip(satelliteRefs.thin_panel_2)
        }
      })

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[0].position.x,
        y: cameraPath[0].position.y,
        z: cameraPath[0].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[0].rotation._x,
        y: cameraPath[0].rotation._y,
        z: cameraPath[0].rotation._z,
      }, `-=${cameraTimelineDuration}`)

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[1].position.x,
        y: cameraPath[1].position.y,
        z: cameraPath[1].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[1].rotation._x,
        y: cameraPath[1].rotation._y,
        z: cameraPath[1].rotation._z,
      }, `-=${cameraTimelineDuration}`)

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[2].position.x,
        y: cameraPath[2].position.y,
        z: cameraPath[2].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[2].rotation._x,
        y: cameraPath[2].rotation._y,
        z: cameraPath[2].rotation._z,
      }, `-=${cameraTimelineDuration}`)

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[3].position.x,
        y: cameraPath[3].position.y,
        z: cameraPath[3].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[3].rotation._x,
        y: cameraPath[3].rotation._y,
        z: cameraPath[3].rotation._z,
      }, `-=${cameraTimelineDuration}`)

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[4].position.x,
        y: cameraPath[4].position.y,
        z: cameraPath[4].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[4].rotation._x,
        y: cameraPath[4].rotation._y,
        z: cameraPath[4].rotation._z,
      }, `-=${cameraTimelineDuration}`)

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[5].position.x,
        y: cameraPath[5].position.y,
        z: cameraPath[5].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[5].rotation._x,
        y: cameraPath[5].rotation._y,
        z: cameraPath[5].rotation._z,
      }, `-=${cameraTimelineDuration}`)

      cameraTimeline.add({
        targets: cameraRef.position,
        x: cameraPath[6].position.x,
        y: cameraPath[6].position.y,
        z: cameraPath[6].position.z,
      })

      cameraTimeline.add({
        targets: cameraRef.rotation,
        x: cameraPath[6].rotation._x,
        y: cameraPath[6].rotation._y,
        z: cameraPath[6].rotation._z,
        complete: () => {
        }
      }, `-=${cameraTimelineDuration}`)
    }
  })
} 
