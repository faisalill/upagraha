import animate from 'animejs'
import { animationStore } from '$lib/stores/animations.js'

const finalSatelliteTransforms = {
  top_panel: {
    position: [0.38, 4.45, 0.19],
    rotation: [0.51, 0.93, 2.55],
    scale: -0.18,
  },
  mid_panels: {
    rotation: [-1.557, 0.34, -2.13],
    position: [0, 0, 0]
  },
  payload_lens: {
    position: [0.75, 3.59, 0.68],
    rotation: [-2.63, -0.93, -2.55],
  },
  lens_light: {
    position: [1.623, 3.307, 1.164],
    rotation: [125, 0, 125],
    lookAt: [-0.5, -3.5, 0],
  },
  side_panel: {
    position: [0.06, 3.65, 0.26],
    rotation: [-1.55, 0.34, -2.13],
  },
  thin_panel_1: {
    position: [0.4, 3.73, 0.36],
    rotation: [-1.55, 0.34, -2.13],
  },
  thin_panel_2: {
    position: [-0.29, 3.99, -0.09],
    rotation: [-1.55, 0.34, -2.13],
  },
  mcu_1: {
    position: [0.65, 3.76, 0.29],
    rotation: [-0.19, -0.52, -0.4],
  },
  mcu_2: {
    position: [0.48, 3.82, 0.57],
    rotation: [-0.19, -0.52, -0.4],
  },
  magnetorquer_1: {
    position: [1.61, 3.38, 0.6],
    rotation: [-0.19, -0.52, -1.97],
  },
  magnetorquer_2: {
    position: [0.48, 4.24, 0.82],
    rotation: [-2.63, -0.93, 2.17],
  },
  payload_body: {
    position: [0.79, 3.6, 0.66],
    rotation: [-2.63, -0.93, -2.55],
  },
  payload_pins: {
    position: [0.75, 3.59, 0.68],
    rotation: [-2.63, -0.93, -2.55],
  },
  payload_knob: {
    position: [0.75, 3.59, 0.68],
    rotation: [-2.63, -0.93, -2.55],
  },
  magnetometer_1: {
    position: [-0.13, 3.68, 0.28],
    rotation: [0.51, 0.93, 0.97],
  },
  magnetometer_2: {
    position: [0.11, 3.6, -0.12],
    rotation: [-2.63, -0.93, -0.97],
  },
  magnetometer_2_handle: {
    position: [0.11, 3.6, -0.12],
    rotation: [-2.63, -0.93, -0.97],
  },
  magnetometer_1_handle: {
    position: [-0.13, 3.68, 0.28],
    rotation: [0.51, 0.93, 0.97],
  },
  battery_holder: {
    position: [-0.65, 4.13, -0.34],
    rotation: [1.59, -0.34, 2.13],
  },
  battery_plate: {
    position: [-0.65, 4.13, -0.34],
    rotation: [1.59, -0.34, 2.13],
  },
  battery_cells: {
    position: [-0.65, 4.13, -0.34],
    rotation: [1.59, -0.34, 2.13],
  },
  solar_panel_right: {
    position: [-0.82, 4.93, -2.43],
    rotation: [-1.55, 0.34, 1.01],
  },
  solar_panel_left: {
    position: [-2.03, 5.32, -0.37],
    rotation: [-1.55, 0.34, 1.01],
  },
  solar_cells_left: {
    position: [-2.03, 5.32, -0.37],
    rotation: [-1.55, 0.34, 1.01],
  },
  solar_cells_right: {
    position: [-0.82, 4.93, -2.43],
    rotation: [-1.55, 0.34, 1.01],
  },
};

const initialSatelliteTransforms = {
  top_panel: {
    position: [0, 20, 0]
  },
  mid_panels: {
    position: [0, 20, 0]
  },
  payload_lens: {
    position: [-40.75, 3.59, 0.68]
  },
  lens_light: {
    position: [-40.75, 3.307, 1.164]
  },
  side_panel: {
    position: [0.06, -1.65, 0.26]
  },
  thin_panel_1: {
    position: [0.4, 6.73, 0.36]
  },
  thin_panel_2: {
    position: [-0.29, 6.73, -0.09]
  },
  mcu_1: {
    position: [0.65, 6.76, 0.29]
  },
  mcu_2: {
    position: [0.48, 6.82, 0.57]
  },
  magnetorquer_1: {
    position: [1.61, 9.38, 0.6]
  },
  magnetorquer_2: {
    position: [0.48, 9.24, 0.82]
  },
  payload_body: {
    position: [0.79, 9.6, 0.66]
  },
  payload_pins: {
    position: [0.75, 9.59, 0.68]
  },
  payload_knob: {
    position: [0.75, 9.59, 0.68]
  },
  magnetometer_1: {
    position: [-0.13, 9.68, 0.28]
  },
  magnetometer_2: {
    position: [0.11, 9.6, -0.12]
  },
  magnetometer_2_handle: {
    position: [0.11, 9.6, -0.12]
  },
  magnetometer_1_handle: {
    position: [-0.13, 9.68, 0.28]
  },
  battery_holder: {
    position: [-0.65, 9.13, -0.34]
  },
  battery_plate: {
    position: [-0.65, 9.13, -0.34]
  },
  battery_cells: {
    position: [-0.65, 9.13, -0.34]
  },
  solar_panel_right: {
    position: [-0.82, 4.93, -8.43]
  },
  solar_panel_left: {
    position: [-2.03, 5.32, 10.37]
  },
  solar_cells_left: {
    position: [-2.03, 5.32, 10.37]
  },
  solar_cells_right: {
    position: [-0.82, 4.93, -10.43]
  },
}

function setupNonPositionTransforms (satelliteRef) {

  animationStore.subscribe((value) => {
    console.log(value)
  })

  satelliteRef.children[0].rotation.x = finalSatelliteTransforms.top_panel.rotation[0]
  satelliteRef.children[0].rotation.y = finalSatelliteTransforms.top_panel.rotation[1]
  satelliteRef.children[0].rotation.z = finalSatelliteTransforms.top_panel.rotation[2]
  satelliteRef.children[0].scale.x = finalSatelliteTransforms.top_panel.scale
  satelliteRef.children[0].scale.y = finalSatelliteTransforms.top_panel.scale
  satelliteRef.children[0].scale.z = finalSatelliteTransforms.top_panel.scale

  satelliteRef.children[1].rotation.x = finalSatelliteTransforms.mid_panels.rotation[0]
  satelliteRef.children[1].rotation.y = finalSatelliteTransforms.mid_panels.rotation[1]
  satelliteRef.children[1].rotation.z = finalSatelliteTransforms.mid_panels.rotation[2]

  satelliteRef.children[2].rotation.x = finalSatelliteTransforms.payload_lens.rotation[0]
  satelliteRef.children[2].rotation.y = finalSatelliteTransforms.payload_lens.rotation[1]
  satelliteRef.children[2].rotation.z = finalSatelliteTransforms.payload_lens.rotation[2]

  satelliteRef.children[3].rotation.x = finalSatelliteTransforms.lens_light.rotation[0]
  satelliteRef.children[3].rotation.y = finalSatelliteTransforms.lens_light.rotation[1]
  satelliteRef.children[3].rotation.z = finalSatelliteTransforms.lens_light.rotation[2]

  satelliteRef.children[4].rotation.x = finalSatelliteTransforms.side_panel.rotation[0]
  satelliteRef.children[4].rotation.y = finalSatelliteTransforms.side_panel.rotation[1]
  satelliteRef.children[4].rotation.z = finalSatelliteTransforms.side_panel.rotation[2]

  satelliteRef.children[5].rotation.x = finalSatelliteTransforms.thin_panel_1.rotation[0]
  satelliteRef.children[5].rotation.y = finalSatelliteTransforms.thin_panel_1.rotation[1]
  satelliteRef.children[5].rotation.z = finalSatelliteTransforms.thin_panel_1.rotation[2]

  satelliteRef.children[6].rotation.x = finalSatelliteTransforms.thin_panel_2.rotation[0]
  satelliteRef.children[6].rotation.y = finalSatelliteTransforms.thin_panel_2.rotation[1]
  satelliteRef.children[6].rotation.z = finalSatelliteTransforms.thin_panel_2.rotation[2]

  satelliteRef.children[7].rotation.x = finalSatelliteTransforms.mcu_1.rotation[0]
  satelliteRef.children[7].rotation.y = finalSatelliteTransforms.mcu_1.rotation[1]
  satelliteRef.children[7].rotation.z = finalSatelliteTransforms.mcu_1.rotation[2]

  satelliteRef.children[8].rotation.x = finalSatelliteTransforms.mcu_2.rotation[0]
  satelliteRef.children[8].rotation.y = finalSatelliteTransforms.mcu_2.rotation[1]
  satelliteRef.children[8].rotation.z = finalSatelliteTransforms.mcu_2.rotation[2]

  satelliteRef.children[9].rotation.x = finalSatelliteTransforms.magnetorquer_1.rotation[0]
  satelliteRef.children[9].rotation.y = finalSatelliteTransforms.magnetorquer_1.rotation[1]
  satelliteRef.children[9].rotation.z = finalSatelliteTransforms.magnetorquer_1.rotation[2]

  satelliteRef.children[10].rotation.x = finalSatelliteTransforms.magnetorquer_2.rotation[0]
  satelliteRef.children[10].rotation.y = finalSatelliteTransforms.magnetorquer_2.rotation[1]
  satelliteRef.children[10].rotation.z = finalSatelliteTransforms.magnetorquer_2.rotation[2]

  satelliteRef.children[11].rotation.x = finalSatelliteTransforms.payload_body.rotation[0]
  satelliteRef.children[11].rotation.y = finalSatelliteTransforms.payload_body.rotation[1]
  satelliteRef.children[11].rotation.z = finalSatelliteTransforms.payload_body.rotation[2]

  satelliteRef.children[12].rotation.x = finalSatelliteTransforms.payload_pins.rotation[0]
  satelliteRef.children[12].rotation.y = finalSatelliteTransforms.payload_pins.rotation[1]
  satelliteRef.children[12].rotation.z = finalSatelliteTransforms.payload_pins.rotation[2]

  satelliteRef.children[13].rotation.x = finalSatelliteTransforms.payload_knob.rotation[0]
  satelliteRef.children[13].rotation.y = finalSatelliteTransforms.payload_knob.rotation[1]
  satelliteRef.children[13].rotation.z = finalSatelliteTransforms.payload_knob.rotation[2]

  satelliteRef.children[14].rotation.x = finalSatelliteTransforms.magnetometer_1.rotation[0]
  satelliteRef.children[14].rotation.y = finalSatelliteTransforms.magnetometer_1.rotation[1]
  satelliteRef.children[14].rotation.z = finalSatelliteTransforms.magnetometer_1.rotation[2]

  satelliteRef.children[15].rotation.x = finalSatelliteTransforms.magnetometer_2.rotation[0]
  satelliteRef.children[15].rotation.y = finalSatelliteTransforms.magnetometer_2.rotation[1]
  satelliteRef.children[15].rotation.z = finalSatelliteTransforms.magnetometer_2.rotation[2]


  satelliteRef.children[16].rotation.x = finalSatelliteTransforms.magnetometer_2_handle.rotation[0]
  satelliteRef.children[16].rotation.y = finalSatelliteTransforms.magnetometer_2_handle.rotation[1]
  satelliteRef.children[16].rotation.z = finalSatelliteTransforms.magnetometer_2_handle.rotation[2]

  satelliteRef.children[17].rotation.x = finalSatelliteTransforms.magnetometer_1_handle.rotation[0]
  satelliteRef.children[17].rotation.y = finalSatelliteTransforms.magnetometer_1_handle.rotation[1]
  satelliteRef.children[17].rotation.z = finalSatelliteTransforms.magnetometer_1_handle.rotation[2]

  satelliteRef.children[18].rotation.x = finalSatelliteTransforms.battery_holder.rotation[0]
  satelliteRef.children[18].rotation.y = finalSatelliteTransforms.battery_holder.rotation[1]
  satelliteRef.children[18].rotation.z = finalSatelliteTransforms.battery_holder.rotation[2]

  satelliteRef.children[19].rotation.x = finalSatelliteTransforms.battery_plate.rotation[0]
  satelliteRef.children[19].rotation.y = finalSatelliteTransforms.battery_plate.rotation[1]
  satelliteRef.children[19].rotation.z = finalSatelliteTransforms.battery_plate.rotation[2]

  satelliteRef.children[20].rotation.x = finalSatelliteTransforms.battery_cells.rotation[0]
  satelliteRef.children[20].rotation.y = finalSatelliteTransforms.battery_cells.rotation[1]
  satelliteRef.children[20].rotation.z = finalSatelliteTransforms.battery_cells.rotation[2]

  satelliteRef.children[21].rotation.x = finalSatelliteTransforms.solar_panel_right.rotation[0]
  satelliteRef.children[21].rotation.y = finalSatelliteTransforms.solar_panel_right.rotation[1]
  satelliteRef.children[21].rotation.z = finalSatelliteTransforms.solar_panel_right.rotation[2]

  satelliteRef.children[22].rotation.x = finalSatelliteTransforms.solar_panel_left.rotation[0]
  satelliteRef.children[22].rotation.y = finalSatelliteTransforms.solar_panel_left.rotation[1]
  satelliteRef.children[22].rotation.z = finalSatelliteTransforms.solar_panel_left.rotation[2]

  satelliteRef.children[23].rotation.x = finalSatelliteTransforms.solar_cells_left.rotation[0]
  satelliteRef.children[23].rotation.y = finalSatelliteTransforms.solar_cells_left.rotation[1]
  satelliteRef.children[23].rotation.z = finalSatelliteTransforms.solar_cells_left.rotation[2]

  satelliteRef.children[24].rotation.x = finalSatelliteTransforms.solar_cells_right.rotation[0]
  satelliteRef.children[24].rotation.y = finalSatelliteTransforms.solar_cells_right.rotation[1]
  satelliteRef.children[24].rotation.z = finalSatelliteTransforms.solar_cells_right.rotation[2]

}

function setupInitialSatellitePartsPosition (satelliteRef) {
  satelliteRef.children[0].position.x = initialSatelliteTransforms.top_panel.position[0];
  satelliteRef.children[0].position.y = initialSatelliteTransforms.top_panel.position[1];
  satelliteRef.children[0].position.z = initialSatelliteTransforms.top_panel.position[2];

  satelliteRef.children[1].position.x = initialSatelliteTransforms.mid_panels.position[0];
  satelliteRef.children[1].position.y = initialSatelliteTransforms.mid_panels.position[1];
  satelliteRef.children[1].position.z = initialSatelliteTransforms.mid_panels.position[2];

  satelliteRef.children[2].position.x = initialSatelliteTransforms.payload_lens.position[0];
  satelliteRef.children[2].position.y = initialSatelliteTransforms.payload_lens.position[1];
  satelliteRef.children[2].position.z = initialSatelliteTransforms.payload_lens.position[2];

  satelliteRef.children[3].position.x = initialSatelliteTransforms.lens_light.position[0];
  satelliteRef.children[3].position.y = initialSatelliteTransforms.lens_light.position[1];
  satelliteRef.children[3].position.z = initialSatelliteTransforms.lens_light.position[2];

  satelliteRef.children[4].position.x = initialSatelliteTransforms.side_panel.position[0];
  satelliteRef.children[4].position.y = initialSatelliteTransforms.side_panel.position[1];
  satelliteRef.children[4].position.z = initialSatelliteTransforms.side_panel.position[2];

  satelliteRef.children[5].position.x = initialSatelliteTransforms.thin_panel_1.position[0];
  satelliteRef.children[5].position.y = initialSatelliteTransforms.thin_panel_1.position[1];
  satelliteRef.children[5].position.z = initialSatelliteTransforms.thin_panel_1.position[2];

  satelliteRef.children[6].position.x = initialSatelliteTransforms.thin_panel_2.position[0];
  satelliteRef.children[6].position.y = initialSatelliteTransforms.thin_panel_2.position[1];
  satelliteRef.children[6].position.z = initialSatelliteTransforms.thin_panel_2.position[2];

  satelliteRef.children[7].position.x = initialSatelliteTransforms.mcu_1.position[0];
  satelliteRef.children[7].position.y = initialSatelliteTransforms.mcu_1.position[1];
  satelliteRef.children[7].position.z = initialSatelliteTransforms.mcu_1.position[2];

  satelliteRef.children[8].position.x = initialSatelliteTransforms.mcu_2.position[0];
  satelliteRef.children[8].position.y = initialSatelliteTransforms.mcu_2.position[1];
  satelliteRef.children[8].position.z = initialSatelliteTransforms.mcu_2.position[2];

  satelliteRef.children[9].position.x = initialSatelliteTransforms.magnetorquer_1.position[0];
  satelliteRef.children[9].position.y = initialSatelliteTransforms.magnetorquer_1.position[1];
  satelliteRef.children[9].position.z = initialSatelliteTransforms.magnetorquer_1.position[2];

  satelliteRef.children[10].position.x = initialSatelliteTransforms.magnetorquer_2.position[0];
  satelliteRef.children[10].position.y = initialSatelliteTransforms.magnetorquer_2.position[1];
  satelliteRef.children[10].position.z = initialSatelliteTransforms.magnetorquer_2.position[2];

  satelliteRef.children[11].position.x = initialSatelliteTransforms.payload_body.position[0];
  satelliteRef.children[11].position.y = initialSatelliteTransforms.payload_body.position[1];
  satelliteRef.children[11].position.z = initialSatelliteTransforms.payload_body.position[2];

  satelliteRef.children[12].position.x = initialSatelliteTransforms.payload_pins.position[0];
  satelliteRef.children[12].position.y = initialSatelliteTransforms.payload_pins.position[1];
  satelliteRef.children[12].position.z = initialSatelliteTransforms.payload_pins.position[2];

  satelliteRef.children[13].position.x = initialSatelliteTransforms.payload_knob.position[0];
  satelliteRef.children[13].position.y = initialSatelliteTransforms.payload_knob.position[1];
  satelliteRef.children[13].position.z = initialSatelliteTransforms.payload_knob.position[2];

  satelliteRef.children[14].position.x = initialSatelliteTransforms.magnetometer_1.position[0];
  satelliteRef.children[14].position.y = initialSatelliteTransforms.magnetometer_1.position[1];
  satelliteRef.children[14].position.z = initialSatelliteTransforms.magnetometer_1.position[2];

  satelliteRef.children[15].position.x = initialSatelliteTransforms.magnetometer_2.position[0];
  satelliteRef.children[15].position.y = initialSatelliteTransforms.magnetometer_2.position[1];
  satelliteRef.children[15].position.z = initialSatelliteTransforms.magnetometer_2.position[2];

  satelliteRef.children[16].position.x = initialSatelliteTransforms.magnetometer_2_handle.position[0];
  satelliteRef.children[16].position.y = initialSatelliteTransforms.magnetometer_2_handle.position[1];
  satelliteRef.children[16].position.z = initialSatelliteTransforms.magnetometer_2_handle.position[2];

  satelliteRef.children[17].position.x = initialSatelliteTransforms.magnetometer_1_handle.position[0];
  satelliteRef.children[17].position.y = initialSatelliteTransforms.magnetometer_1_handle.position[1];
  satelliteRef.children[17].position.z = initialSatelliteTransforms.magnetometer_1_handle.position[2];

  satelliteRef.children[18].position.x = initialSatelliteTransforms.battery_holder.position[0];
  satelliteRef.children[18].position.y = initialSatelliteTransforms.battery_holder.position[1];
  satelliteRef.children[18].position.z = initialSatelliteTransforms.battery_holder.position[2];

  satelliteRef.children[19].position.x = initialSatelliteTransforms.battery_plate.position[0];
  satelliteRef.children[19].position.y = initialSatelliteTransforms.battery_plate.position[1];
  satelliteRef.children[19].position.z = initialSatelliteTransforms.battery_plate.position[2];

  satelliteRef.children[20].position.x = initialSatelliteTransforms.battery_cells.position[0];
  satelliteRef.children[20].position.y = initialSatelliteTransforms.battery_cells.position[1];
  satelliteRef.children[20].position.z = initialSatelliteTransforms.battery_cells.position[2];

  satelliteRef.children[21].position.x = initialSatelliteTransforms.solar_panel_right.position[0];
  satelliteRef.children[21].position.y = initialSatelliteTransforms.solar_panel_right.position[1];
  satelliteRef.children[21].position.z = initialSatelliteTransforms.solar_panel_right.position[2];

  satelliteRef.children[22].position.x = initialSatelliteTransforms.solar_panel_left.position[0];
  satelliteRef.children[22].position.y = initialSatelliteTransforms.solar_panel_left.position[1];
  satelliteRef.children[22].position.z = initialSatelliteTransforms.solar_panel_left.position[2];

  satelliteRef.children[23].position.x = initialSatelliteTransforms.solar_cells_left.position[0];
  satelliteRef.children[23].position.y = initialSatelliteTransforms.solar_cells_left.position[1];
  satelliteRef.children[23].position.z = initialSatelliteTransforms.solar_cells_left.position[2];

  satelliteRef.children[24].position.x = initialSatelliteTransforms.solar_cells_right.position[0];
  satelliteRef.children[24].position.y = initialSatelliteTransforms.solar_cells_right.position[1];
  satelliteRef.children[24].position.z = initialSatelliteTransforms.solar_cells_right.position[2];
}

export function initialSatelliteAnimation(satelliteRef) {

  animationStore.subscribe((value) => {
    if( value.isIntroDone && !value.isSectionOneSatelliteAnimationDone){

      setupNonPositionTransforms(satelliteRef)

      setupInitialSatellitePartsPosition(satelliteRef)

      var animateTimeline = animate.timeline({
        easing: "easeOutExpo",
        duration: 800,
      })

      animateTimeline.add({
        targets: satelliteRef.children[4].position,
        x: finalSatelliteTransforms.side_panel.position[0],
        y: finalSatelliteTransforms.side_panel.position[1],
        z: finalSatelliteTransforms.side_panel.position[2],
      }, '+=450')

      animateTimeline.add({
        targets: satelliteRef.children[1].position,
        x: finalSatelliteTransforms.mid_panels.position[0],
        y: finalSatelliteTransforms.mid_panels.position[1],
        z: finalSatelliteTransforms.mid_panels.position[2],
      }) 

      animateTimeline.add({
        targets: satelliteRef.children[18].position,
        x: finalSatelliteTransforms.battery_holder.position[0],
        y: finalSatelliteTransforms.battery_holder.position[1],
        z: finalSatelliteTransforms.battery_holder.position[2],
      })

      const batteryOffset = 500;

      animateTimeline.add({
        targets: satelliteRef.children[19].position,
        x: finalSatelliteTransforms.battery_plate.position[0],
        y: finalSatelliteTransforms.battery_plate.position[1],
        z: finalSatelliteTransforms.battery_plate.position[2],
      }, `-=${batteryOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[20].position,
        x: finalSatelliteTransforms.battery_cells.position[0],
        y: finalSatelliteTransforms.battery_cells.position[1],
        z: finalSatelliteTransforms.battery_cells.position[2],
      }, `-=${batteryOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[6].position,
        x: finalSatelliteTransforms.thin_panel_2.position[0],
        y: finalSatelliteTransforms.thin_panel_2.position[1],
        z: finalSatelliteTransforms.thin_panel_2.position[2],
      })

      animateTimeline.add({
        targets: satelliteRef.children[14].position,
        x: finalSatelliteTransforms.magnetometer_1.position[0],
        y: finalSatelliteTransforms.magnetometer_1.position[1],
        z: finalSatelliteTransforms.magnetometer_1.position[2],
      })

      const magnetometerOffset = 650;

      animateTimeline.add({
        targets: satelliteRef.children[17].position,
        x: finalSatelliteTransforms.magnetometer_1_handle.position[0],
        y: finalSatelliteTransforms.magnetometer_1_handle.position[1],
        z: finalSatelliteTransforms.magnetometer_1_handle.position[2],
      }, `-=${magnetometerOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[15].position,
        x: finalSatelliteTransforms.magnetometer_2.position[0],
        y: finalSatelliteTransforms.magnetometer_2.position[1],
        z: finalSatelliteTransforms.magnetometer_2.position[2],
      })

      animateTimeline.add({
        targets: satelliteRef.children[16].position,
        x: finalSatelliteTransforms.magnetometer_2_handle.position[0],
        y: finalSatelliteTransforms.magnetometer_2_handle.position[1],
        z: finalSatelliteTransforms.magnetometer_2_handle.position[2],
      }, `-=${magnetometerOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[5].position,
        x: finalSatelliteTransforms.thin_panel_1.position[0],
        y: finalSatelliteTransforms.thin_panel_1.position[1],
        z: finalSatelliteTransforms.thin_panel_1.position[2],
      })

      const mcuOffset = 550;

      animateTimeline.add({
        targets: satelliteRef.children[7].position,
        x: finalSatelliteTransforms.mcu_1.position[0],
        y: finalSatelliteTransforms.mcu_1.position[1],
        z: finalSatelliteTransforms.mcu_1.position[2],
      })

      animateTimeline.add({
        targets: satelliteRef.children[8].position,
        x: finalSatelliteTransforms.mcu_2.position[0],
        y: finalSatelliteTransforms.mcu_2.position[1],
        z: finalSatelliteTransforms.mcu_2.position[2],
      }, `-=${mcuOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[9].position,
        x: finalSatelliteTransforms.magnetorquer_1.position[0],
        y: finalSatelliteTransforms.magnetorquer_1.position[1],
        z: finalSatelliteTransforms.magnetorquer_1.position[2],
      })

      const magnetorquerOffset = 600;

      animateTimeline.add({
        targets: satelliteRef.children[10].position,
        x: finalSatelliteTransforms.magnetorquer_2.position[0],
        y: finalSatelliteTransforms.magnetorquer_2.position[1],
        z: finalSatelliteTransforms.magnetorquer_2.position[2],
      }, `-=${magnetorquerOffset}`)

      const payloadOffset = 700;

      animateTimeline.add({
        targets: satelliteRef.children[11].position,
        x: finalSatelliteTransforms.payload_body.position[0],
        y: finalSatelliteTransforms.payload_body.position[1],
        z: finalSatelliteTransforms.payload_body.position[2],
      })

      animateTimeline.add({
        targets: satelliteRef.children[12].position,
        x: finalSatelliteTransforms.payload_pins.position[0],
        y: finalSatelliteTransforms.payload_pins.position[1],
        z: finalSatelliteTransforms.payload_pins.position[2],
      }, `-=${payloadOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[13].position,
        x: finalSatelliteTransforms.payload_knob.position[0],
        y: finalSatelliteTransforms.payload_knob.position[1],
        z: finalSatelliteTransforms.payload_knob.position[2],
      }, `-=${payloadOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[2].position,
        x: finalSatelliteTransforms.payload_lens.position[0],
        y: finalSatelliteTransforms.payload_lens.position[1],
        z: finalSatelliteTransforms.payload_lens.position[2],
      }, `-=${payloadOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[3].position,
        x: finalSatelliteTransforms.lens_light.position[0],
        y: finalSatelliteTransforms.lens_light.position[1],
        z: finalSatelliteTransforms.lens_light.position[2],
      }, `-=${payloadOffset}`)

      const solarPanelOffset = 750;

      animateTimeline.add({
        targets: satelliteRef.children[21].position,
        x: finalSatelliteTransforms.solar_panel_right.position[0],
        y: finalSatelliteTransforms.solar_panel_right.position[1],
        z: finalSatelliteTransforms.solar_panel_right.position[2],
      })

      animateTimeline.add({
        targets: satelliteRef.children[22].position,
        x: finalSatelliteTransforms.solar_panel_left.position[0],
        y: finalSatelliteTransforms.solar_panel_left.position[1],
        z: finalSatelliteTransforms.solar_panel_left.position[2],
      }, `-=${solarPanelOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[23].position,
        x: finalSatelliteTransforms.solar_cells_left.position[0],
        y: finalSatelliteTransforms.solar_cells_left.position[1],
        z: finalSatelliteTransforms.solar_cells_left.position[2],
      }, `-=${solarPanelOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[24].position,
        x: finalSatelliteTransforms.solar_cells_right.position[0],
        y: finalSatelliteTransforms.solar_cells_right.position[1],
        z: finalSatelliteTransforms.solar_cells_right.position[2],
      }, `-=${solarPanelOffset}`)

      animateTimeline.add({
        targets: satelliteRef.children[0].position,
        x: finalSatelliteTransforms.top_panel.position[0],
        y: finalSatelliteTransforms.top_panel.position[1],
        z: finalSatelliteTransforms.top_panel.position[2],
        complete: () => {
          animationStore.update((value) => {
            return {
              ...value,
              isSectionOneSatelliteAnimationDone: true
            }
          })
        }
      })
      }
    }) 
  
}
