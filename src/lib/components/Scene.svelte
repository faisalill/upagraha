<script>
import { useThrelte, T, useFrame } from '@threlte/core';
import { OrbitControls, Grid, Float, Stars, useTexture } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { BoxGeometry, EquirectangularReflectionMapping, PlaneGeometry, ShaderMaterial, TorusGeometry, DoubleSide } from 'three';
import Satellite from '$lib/components/models/satellite.svelte'
import GalaxyScene from '$lib/components/models/scene.svelte'
import ShootingStar from './Stars.svelte';
import { onMount } from 'svelte';
import { injectLookAtPlugin } from '$lib/plugins/lookAtPlugin'
import { SheetObject } from '@threlte/theatre';
import Galaxy from './Galaxy.svelte';

injectLookAtPlugin()

const { scene } = useThrelte();
const starTexture = useTexture('/textures/star.png');
const rgbeLoader = new RGBELoader();

let torusRef = null;
let eyeCandyOne = null;
let eyeCandyTwo = null;

onMount(()=> {
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
})
</script>

<T.AmbientLight intensity={8} />
<T.DirectionalLight intensity={20.5} position={[5, 10, 0]} />

    <T.PerspectiveCamera 
      makeDefault 
      position={[9.525449, 3.648321, 0.55692857]} 
    >
      <OrbitControls enableDamping />
    </T.PerspectiveCamera>

<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
<Satellite position={[0, 0, 0]} />
</Float>

<!-- <Stars  -->
<!--   count={4000}  -->
<!--   factor={6} -->
<!--   lightness={0.4} -->
<!--   speed={4} -->
<!-- /> -->

  

<!-- https://github.com/junni-inc/next.junni.co.jp/tree/master/src/ts/MainScene/World/Sections/Section1/Wall/shaders--> 
<!-- <T.Mesh -->
<!-- position={[-4, 3, 0]} -->
<!-- rotation={[ 0, Math.PI / 2, 0]} -->
<!-- bind:ref={eyeCandyBackground} -->
<!-- > -->
<!--   <T.PlaneGeometry args={[30, 30]} /> -->
<!--   <T.ShaderMaterial  -->
<!--     depthWrite={false} -->
<!--     transparent={true} -->
<!--     uniforms={{ -->
<!--       uTime: { value: 0 } -->
<!--     }} -->
<!--   vertexShader={` -->
<!--     varying vec2 vUv; -->
<!--     void main() { -->
<!--       vUv = uv; -->
<!--       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); -->
<!--     } -->
<!--   `} -->
<!--   fragmentShader={` -->
<!--     float random(vec2 p){ -->
<!--       return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453); -->
<!--     } -->
<!--     vec3 hsv2rgb( vec3 hsv ){ -->
<!---->
<!--       return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z; -->
<!---->
<!--     } -->
<!--     varying vec2 vUv; -->
<!--     uniform float uTime; -->
<!--     void main() { -->
<!--       vec3 color = hsv2rgb( vec3( -vUv.x * 0.2 + 0.3 + uTime * 0.1 + random( gl_FragCoord.xy * 0.01 ) * 0.02, 0.95, 1.0  ) ); -->
<!--       gl_FragColor = vec4(color , 0.7); -->
<!--     } -->
<!--   `} -->
<!--   /> -->
<!-- </T.Mesh> -->

<GalaxyScene 
  position={[-4, 4, 0]}
  scale = {2.5}
  rotation={[0, 1.5, 0]}
/>
