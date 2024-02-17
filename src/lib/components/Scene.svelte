<script>
  import { T, useThrelte, useTask } from '@threlte/core';
  import { OrbitControls, useGltf, InstancedMesh, Instance } from '@threlte/extras';
  import Satellite from '$lib/components/models/satellite.svelte';
  import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
  import { EquirectangularReflectionMapping, Vector3, FrontSide, Color } from 'three';
  import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';
  import HolographicMaterial from '$lib/materials/HolographicMaterial.js';
  import { onMount } from 'svelte';

  const rgbeLoader = new RGBELoader();
  const model = useGltf('/models/satellite.glb', { useDraco: true });
  let sidePanel;
  let isLoaded = false;
  let sampler;
  let sidePanelPositions = [];
  let particlesCount = 10;
  let holographicMaterialRef;
  let holographicMaterialParams = {
    fresnelAmount: 0.2,
    fresnelOpacity: 0.15,
    hologramBrightness: 0.7,
    scanlineSize: 6,
    signalSpeed: 2.3,
    hologramColor: "#ff0000",
    hologramOpacity: 1.0,
    blinkFresnelOnly: true,
    enableBlinking: true,
    enableAdditive: true,
    side: FrontSide,
  };
  let holographicMaterial = new HolographicMaterial();
  const { scene } = useThrelte();

  onMount(async() => {

    model.then((val) => {
      sidePanel = val.nodes.side_panel;

      sampler = new MeshSurfaceSampler(sidePanel).build();

      for ( let i = 0; i < particlesCount; i++) {
        const position = new Vector3();
        sampler.sample(position);
        sidePanelPositions.push(position);
      }

      isLoaded = true;
    })
    rgbeLoader.load('/envMap.hdr', (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      scene.environment = texture;
    })

  })

  useTask((delta) =>{
    holographicMaterial.update();
    // if (isLoaded) {
    //   shaderMaterialRef.uniforms.uTime.value += delta;
    //   pointsRef.rotation.z += 0.01;
    // }
  })

</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 380]}
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- {#await model then value} -->
<!-- <!-- <T.Points --> -->
<!-- <!--  geometry={value.nodes.Payload001.geometry} --> -->
<!-- <!--  bind:ref={pointsRef} --> -->
<!-- <!-- > --> -->
<!-- <!--   <T.MeshBasicMaterial --> -->
<!-- <!--     wireframe --> -->
<!-- <!--   /> --> -->
<!-- <!--   <!-- <T.ShaderMaterial  --> --> -->
<!-- <!--   <!--   bind:ref={shaderMaterialRef} --> --> -->
<!-- <!--   <!--   uniforms={{ --> --> -->
<!-- <!--   <!--     uTime: { value: 0.0 } --> --> -->
<!-- <!--   <!--   }} --> --> -->
<!-- <!--   <!--   vertexShader={` --> --> -->
<!-- <!--   <!--     uniform float uTime; --> --> -->
<!-- <!--   <!--     void main() { --> --> -->
<!-- <!--   <!--       gl_PointSize = 2.0; --> --> -->
<!-- <!--   <!--       vec3 pos = position; --> --> -->
<!-- <!--   <!--       float variation = sin(uTime * 8.0 + pos.y * 0.2) * 0.4; --> --> -->
<!-- <!--   <!--       pos.x += fract(variation * 2.0); --> --> -->
<!-- <!--   <!--       gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0); --> --> -->
<!-- <!--   <!--     } --> --> -->
<!-- <!--   <!--   `} --> --> -->
<!-- <!--   <!--   fragmentShader={` --> --> -->
<!-- <!--   <!--     varying vec3 vNormal; --> --> -->
<!-- <!--   <!--     uniform float uTime; --> --> -->
<!-- <!--   <!--     void main() { --> --> -->
<!-- <!--   <!--       vec3 col = vec3(1.0, 2.0, 3.0); --> --> -->
<!-- <!--   <!--       vec3 variation = 0.5 * col; --> --> -->
<!-- <!--   <!--       gl_FragColor = vec4(variation, 1.0); --> --> -->
<!-- <!--   <!--     } --> --> -->
<!-- <!--   <!--   `} --> --> -->
<!-- <!--   <!--   transparent --> --> -->
<!-- <!--   <!--   /> --> --> -->
<!-- <!-- </T.Points> --> -->
<!-- <T.Mesh -->
<!-- geometry={value.nodes.Payload001.geometry} -->
<!-- material={holographicMaterial} -->
<!-- bind:ref={holographicMaterialRef} -->
<!-- > -->
<!-- </T.Mesh> -->
<!-- {/await} -->

<Satellite position={[0,0,0]} scale={50} />


