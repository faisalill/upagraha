<script>
import { useThrelte, T, useFrame } from '@threlte/core';
import { OrbitControls, Grid, Float, Stars, useTexture } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { BoxGeometry, EquirectangularReflectionMapping, PlaneGeometry, ShaderMaterial, TorusGeometry, DoubleSide, PerspectiveCamera } from 'three';
import Satellite from '$lib/components/models/satellite.svelte'
import GalaxyScene from '$lib/components/models/scene.svelte'
import ShootingStar from './Stars.svelte';
import Text from './Text.svelte'
import { onMount } from 'svelte';
import { injectLookAtPlugin } from '$lib/plugins/lookAtPlugin'
import { cameraAnimation } from '$lib/animations/camera.js'
import { scrollAnimationInit } from '$lib/animations/scroll.js'

injectLookAtPlugin()

const { scene } = useThrelte();
const starTexture = useTexture('/textures/star.png');
const rgbeLoader = new RGBELoader();

let torusRef = null;
let satelliteRef = null;
let cameraRef = null;
let eyeCandyOne = null;
let eyeCandyTwo = null;

let animated = false;

onMount(async ()=> {
  rgbeLoader.load('/textures/envMap.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  });
})

useFrame((_, delta) => {
  if(torusRef) {
    torusRef.material.uniforms.uTime.value += delta;
    torusRef.rotation.z += 0.002;
  }
  if(satelliteRef && !animated) {
    animated = true;
    cameraAnimation(cameraRef)
    scrollAnimationInit(window)
  }
})
</script>

<T.AmbientLight intensity={8} />
<T.DirectionalLight intensity={20.5} position={[5, 10, 0]} />

<T.PerspectiveCamera 
  makeDefault
  position={[10, 0, 1]}
  bind:ref={cameraRef}
>
</T.PerspectiveCamera>

<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
<Satellite bind:ref={satelliteRef} position={[0, 0, 0]} />
</Float>

<!-- <Satellite bind:ref={satelliteRef} /> -->

<!-- <Stars  -->
<!--   count={4000}  -->
<!--   factor={6} -->
<!--   lightness={0.4} -->
<!--   speed={4} -->
<!-- /> -->

<GalaxyScene 
  position={[-4, 4, 0]}
  scale = {3}
  rotation={[0, 1.5, 0]}
/>

<Text />
