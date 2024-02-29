import animate from 'animejs';

const camerainitialState = {
  position: [0, 0, 0],
}

const cameraStates = {
  satelliteBatteryZoom: {
    position: [2.92130493, 5.48073669, -1.54802376],
    rotation: [-2.41617479, 1.13578681, 2.46434609]
  },
  satelliteMagnetometerZoom: {
    position: [3.04312209, 5.357150446, 0.64390950],
    rotation: [-1.427221556, 1.06448749, 1.406968808]
  },
  satelliteMcuZoom: {
    position: [0.053022366, 6.63741509, 1.03888336],
    rotation: [-1.4077592331, -0.2629428372, -1.006559095]
  },
  satellitePayloadZoom: {
    position: [4.980827126, 3.75990440585, 1.28417413],
    rotation: [-0.05489039475, 1.465418151, 0.054586516009]
  },
  satelliteSolarPanelsZoom: {
    position: [4.131805232365145, 4.789920397844188, 0.26591097744528625],
    rotation: [-2.2452579912767012, 1.2952606879926158, 2.264086956897456]
  },
  satelliteStructureZoom: {
    position: [10.54881755110208, 4.669838774768284, 0.813453876330388],
    rotation: [-1.2192278020835396, 1.5299719395070528, 1.218958224920116]
  },
}

export function cameraAnimation(cameraRef){

  const duration = 2000;

  var timeline = animate.timeline({
    easing: 'easeInOutExpo',
    duration: duration,
  })

  timeline.add({
    targets: cameraRef.position,
    x: cameraStates.satelliteBatteryZoom.position[0],
    y: cameraStates.satelliteBatteryZoom.position[1],
    z: cameraStates.satelliteBatteryZoom.position[2],
  })

  timeline.add({
    targets: cameraRef.rotation,
    x: cameraStates.satelliteBatteryZoom.rotation[0],
    y: cameraStates.satelliteBatteryZoom.rotation[1],
    z: cameraStates.satelliteBatteryZoom.rotation[2],
  },`-=${duration}`)

  timeline.add({
    targets: cameraRef.position,
    x: cameraStates.satelliteMagnetometerZoom.position[0],
    y: cameraStates.satelliteMagnetometerZoom.position[1],
    z: cameraStates.satelliteMagnetometerZoom.position[2],
  }, `+=1000`)

  timeline.add({
    targets: cameraRef.rotation,
    x: cameraStates.satelliteMagnetometerZoom.rotation[0],
    y: cameraStates.satelliteMagnetometerZoom.rotation[1],
    z: cameraStates.satelliteMagnetometerZoom.rotation[2],
  },`-=${duration}`)

  timeline.add({
    targets: cameraRef.position,
    x: cameraStates.satelliteMcuZoom.position[0],
    y: cameraStates.satelliteMcuZoom.position[1],
    z: cameraStates.satelliteMcuZoom.position[2],
  }, `+=1000`)

  timeline.add({
    targets: cameraRef.rotation,
    x: cameraStates.satelliteMcuZoom.rotation[0],
    y: cameraStates.satelliteMcuZoom.rotation[1],
    z: cameraStates.satelliteMcuZoom.rotation[2],
  },`-=${duration}`)

  timeline.add({
    targets: cameraRef.position,
    x: cameraStates.satellitePayloadZoom.position[0],
    y: cameraStates.satellitePayloadZoom.position[1],
    z: cameraStates.satellitePayloadZoom.position[2],
  })

  timeline.add({
    targets: cameraRef.rotation,
    x: cameraStates.satellitePayloadZoom.rotation[0],
    y: cameraStates.satellitePayloadZoom.rotation[1],
    z: cameraStates.satellitePayloadZoom.rotation[2],
  },`-=${duration}`)

  timeline.add({
    targets: cameraRef.position,
    x: cameraStates.satelliteSolarPanelsZoom.position[0],
    y: cameraStates.satelliteSolarPanelsZoom.position[1],
    z: cameraStates.satelliteSolarPanelsZoom.position[2],
  })

  timeline.add({
    targets: cameraRef.rotation,
    x: cameraStates.satelliteSolarPanelsZoom.rotation[0],
    y: cameraStates.satelliteSolarPanelsZoom.rotation[1],
    z: cameraStates.satelliteSolarPanelsZoom.rotation[2],
  },`-=${duration}`)

  timeline.add({
    targets: cameraRef.position,
    x: cameraStates.satelliteStructureZoom.position[0],
    y: cameraStates.satelliteStructureZoom.position[1],
    z: cameraStates.satelliteStructureZoom.position[2],
  })

  timeline.add({
    targets: cameraRef.rotation,
    x: cameraStates.satelliteStructureZoom.rotation[0],
    y: cameraStates.satelliteStructureZoom.rotation[1],
    z: cameraStates.satelliteStructureZoom.rotation[2],
  },`-=${duration}`)

}


