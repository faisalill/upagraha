<script>
  import { T, forwardEventHandlers, useFrame } from '@threlte/core';
  import { useGltf, Edges } from '@threlte/extras';
  import { Group, DoubleSide } from 'three';
  import { initialSatelliteAnimation } from '$lib/animations/satellite.js';
  import HolographicMaterial from '$lib/materials/HolographicMaterial.js';

  export const ref = new Group()
  
  const gltf = useGltf('/models/satellite.glb', { useDraco: true })
  const component = forwardEventHandlers()
 
  let objects = {
    solarCellsRight: null,
    solarCellsLeft: null,
    payloadLens: null,
    lensLight: null,
    topPanel: null,
    sidePanel: null
  }

  let animated = false;

  useFrame((_, delta) => {
    if($gltf && !animated){
      animated = true;
      initialSatelliteAnimation(ref)
    }
    if (objects.solarCellsRight) {
      objects.solarCellsRight.material.uniforms.uTime.value += delta
    }
    if (objects.solarCellsLeft) {
      objects.solarCellsLeft.material.uniforms.uTime.value += delta
    }
    if (objects.payloadLens) {
      objects.payloadLens.material.uniforms.uTime.value += delta
    }
    if (objects.lensLight) {
      objects.lensLight.material.uniforms.uTime.value += delta
    }
  })

</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Mesh
      name="top_panel"
      geometry={gltf.nodes.top_panel.geometry}
      bind:ref={objects.topPanel}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="mid_panels"
      geometry={gltf.nodes['mid_panel-2'].geometry}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="payload_lens"
      geometry={gltf.nodes.payload_lens.geometry}
      bind:ref={objects.payloadLens}
    >
      <T.ShaderMaterial 
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexShader={`
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vUv = position.xy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vec2 newUv = vUv * 0.3; 
            newUv.x += 0.1;
            newUv.x *= 5.0;
            newUv.y += 0.1;
            newUv.y *= 5.0;
            newUv.y = 1.0 - newUv.y;

            vec3 variation = vec3(step(0.2, sin(newUv.x * 55.0 + uTime * 10.0)));
            variation += sin(length(sin(length(vec2(vUv.x + 0.08, vUv.y - 0.01))) * 70.0 + uTime));
            variation = variation * 0.5;
            vec3 color = vec3(1.0, 2.0, 3.0); 
            color *= variation;

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="lens_light"
      lookAt={[-0.5, -3.5, 0]}
      bind:ref={objects.lensLight}
    >
      <T.ConeGeometry
        args={[0.5, 2, 32]} 
      />
        <T.ShaderMaterial 
        transparent
        wireframe
        side={2}
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
              vec2 newUv = vUv;
              newUv.y += sin(newUv.x * 10.0 + uTime);

              vec3 variationX = vec3(step(0.5, sin(newUv.x * 50.0))); 
              variationX += sin(length(newUv.x * 30.0 + uTime));
              variationX = clamp(variationX, 0.0, 0.9);

              vec3 variationY = vec3(step(0.5, sin(newUv.y * 50.0))); 
              variationY += sin(length(newUv.y * 30.0 + uTime));
              variationY = clamp(variationY, 0.0, 0.9);
              
              vec3 color = vec3(1.0, 2.0, 3.0);
              color *= variationX;
              color *= variationY;


              gl_FragColor = vec4(color, newUv.y);
            }
        `}
        />
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="side_panel"
      geometry={gltf.nodes.side_panel.geometry}
      bind:ref={objects.sidePanel}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="thin_panel_1"
      geometry={gltf.nodes.thin_panel_1.geometry}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="thin_panel_2"
      geometry={gltf.nodes.thin_panel_2.geometry}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="MCU_1"
      geometry={gltf.nodes.MCU_1.geometry}
    >
      <T.MeshStandardMaterial color="#47183a">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="MCU_2"
      geometry={gltf.nodes.MCU_2.geometry}
    >
      <T.MeshStandardMaterial color="#47183a">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="magnetorquer_1"
      geometry={gltf.nodes.magnetorquer_1.geometry}
    >
      <T.MeshStandardMaterial color="#000000">
      </T.MeshStandardMaterial>
        <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="magnetorquer_2"
      geometry={gltf.nodes.magnetorquer_2.geometry}
    >
      <T.MeshStandardMaterial color="#000000">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="paylod_body"
      geometry={gltf.nodes.payload_body.geometry}
      position={[0.79, 3.6, 0.66]}
    >
      <T.MeshStandardMaterial color="#000000">
      </T.MeshStandardMaterial>
      <Edges visible={false} color="black" />
    </T.Mesh>

    <T.Mesh
      name="payload_pins"
      geometry={gltf.nodes.payload_pins.geometry}
      position={[0.75, 3.59, 0.68]}
    >
      <T.MeshStandardMaterial color="#5b5b5b">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="payload_knob"
      geometry={gltf.nodes.payload_knob.geometry}
      position={[0.75, 3.59, 0.68]}
    >
      <T.MeshStandardMaterial color="#5b5b5b">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="magnetometer_1"
      geometry={gltf.nodes.magnetometer_1.geometry}
      position={[-0.13, 3.68, 0.28]}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges visible={false} color="black" />
    </T.Mesh>

    <T.Mesh
      name="magnetometer_2"
      geometry={gltf.nodes.magnetometer_2.geometry}
      position={[0.11, 3.6, -0.12]}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges visible={false} color="black" />
    </T.Mesh>

    <T.Mesh
      name="magnetometer_2_handle"
      geometry={gltf.nodes.magnetometer_2_handle.geometry}
      position={[0.11, 3.6, -0.12]}
    >
      <T.MeshStandardMaterial color="#2d2d2d">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="magnetometer_1_handle"
      geometry={gltf.nodes.magnetometer_1_handle.geometry}
      position={[-0.13, 3.68, 0.28]}
    >
      <T.MeshStandardMaterial color="#2d2d2d">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="battery_holder"
      geometry={gltf.nodes.battery_holder.geometry}
      position={[-0.65, 4.13, -0.34]}
    >
      <T.MeshStandardMaterial color="#000000">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="battery_plate"
      geometry={gltf.nodes.battery_plate.geometry}
      position={[-0.65, 4.13, -0.34]}
    >
      <T.MeshStandardMaterial color="#472200">
      </T.MeshStandardMaterial>
      <Edges color="black" />
    </T.Mesh>

    <T.Mesh
      name="battery_cells"
      geometry={gltf.nodes.battery_cells.geometry}
      position={[-0.65, 4.13, -0.34]}
    >
      <T.MeshStandardMaterial color="#473100">
      </T.MeshStandardMaterial>
      <Edges visible={false} color="black" />
    </T.Mesh>

          
    <T.Mesh
      name="solar_panel_right"
      geometry={gltf.nodes.solar_panel_right.geometry}
      position={[-0.82, 4.93, -2.43]}
    >
      <T.MeshStandardMaterial color="#434343" 

      />
      <Edges color="cyan" />
    </T.Mesh>

    <T.Mesh
      name="solar_panel_left"
      geometry={gltf.nodes.solar_panel_left.geometry}
      position={[-2.03, 5.32, -0.37]}
    >
      <T.MeshStandardMaterial color="#434343">
      </T.MeshStandardMaterial>
      <Edges color="cyan" />
    </T.Mesh>

    <T.Mesh
      name="solar_cells_left"
      geometry={gltf.nodes.solar_cells_left.geometry}
      bind:ref={objects.solarCellsLeft}
    >
      <T.ShaderMaterial 
        color="#043843"
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexShader={`
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vUv = uv;
            vec3 newPos = position;
            newPos.z = position.z + normal.z * 0.03;
            newPos.z += 0.01;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
          }
        `}
        fragmentShader={`
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vec2 newUv = vUv;

            vec3 variationX = vec3(step(0.5, sin(newUv.x * 150.0))); 
            variationX += sin(length(newUv.x * 10.0 + uTime));

            vec3 variationY = vec3(step(0.5, sin(newUv.y * 150.0))); 
            variationY += sin(length(newUv.y * 10.0 + uTime));
        
            vec3 color = vec3(1.0, 2.0, 4.0); 
            color *= variationY;
            color *= variationX;

            gl_FragColor = vec4(color, 1.0);
          }
        `}
        >
        </T.ShaderMaterial>
        <Edges color="darkcyan" />
    </T.Mesh>

    <T.Mesh
      name="solar_cells_right"
      geometry={gltf.nodes.solar_cells_right.geometry}
      bind:ref={objects.solarCellsRight}
    >
      <T.ShaderMaterial 
        color="#043843"
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexShader={`
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vUv = uv;
            vec3 newPos = position;
            newPos.z = position.z + normal.z * 0.03;
            newPos.z += 0.01;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
          }
        `}
        fragmentShader={`
        varying vec2 vUv;
        uniform float uTime;
        void main() {
            vec2 newUv = vUv;
            newUv.x += uTime * 0.05;

            vec3 variationX = vec3(step(0.5, sin(newUv.x * 150.0))); 
            variationX += sin(length(newUv.x * 10.0 + uTime));

            vec3 variationY = vec3(step(0.5, sin(newUv.y * 150.0))); 
            variationY += sin(length(newUv.y * 10.0 + uTime));
        
            vec3 color = vec3(1.0, 2.0, 4.0); 
            color *= variationY;
            color *= variationX;

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
      <Edges color="darkcyan" />
    </T.Mesh>

  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
