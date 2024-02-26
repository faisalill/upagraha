<script>
import { useThrelte, T, useFrame } from '@threlte/core';
import { OrbitControls, Grid, Float, Stars, useTexture } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { BoxGeometry, EquirectangularReflectionMapping, PlaneGeometry, ShaderMaterial, TorusGeometry, DoubleSide } from 'three';
import Satellite from '$lib/components/models/satellite.svelte'
import ShootingStar from './Stars.svelte';
import { onMount } from 'svelte';
import { injectLookAtPlugin } from '$lib/plugins/lookAtPlugin'
import { SheetObject } from '@threlte/theatre';

injectLookAtPlugin()

const { scene } = useThrelte();
const starTexture = useTexture('/textures/star.png');
const rgbeLoader = new RGBELoader();

let torusRef = null;
let eyeCandyOne = null;
let eyeCandyTwo = null;
let eyeCandyBackground = null;

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
  if(eyeCandyBackground) {
    eyeCandyBackground.material.uniforms.uTime.value += delta;
  }
})
</script>

<T.AmbientLight intensity={8} />
<T.DirectionalLight intensity={20.5} position={[5, 10, 0]} />

<SheetObject
  key="Camera"
  let:Transform
  let:Declare
>
<Declare 
    props={{
      lookAtX: 0, 
      lookAtY: 2,
      lookAtZ: 0
    }}
    let:values
>
  <Transform>
    <T.PerspectiveCamera 
      makeDefault 
      position={[9.525449, 3.648321, 0.55692857]} 
      lookAt={[values.lookAtX, values.lookAtY, values.lookAtZ]}
    >
      <OrbitControls enableDamping />
    </T.PerspectiveCamera>
  </Transform>
</Declare>
</SheetObject>

<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
<Satellite position={[0, 0, 0]} />
</Float>

<Stars 
  count={4000} 
  factor={6}
  lightness={0.4}
  speed={4}
/>

  

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



<T.Mesh
position={[-100, 3, 0]}
rotation={[ 0, Math.PI / 2, 0]}
bind:ref={eyeCandyBackground}
>
  <T.PlaneGeometry args={[60, 60]} />
  <T.ShaderMaterial 
  wireframe={false}
  transparent={true}
  depthWrite={false}
  uniforms={{
    uTime: { value: 0 }
  }}
  vertexShader={` 
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `}
  fragmentShader={` 
    float random(vec2 p){
      return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    varying vec2 vUv;
    uniform float uTime;
    void main() { 
      vec2 newUv = vUv;
      vec3 color = vec3(1.0, 2.0, 3.0);
      color.r = sin(uTime + length(vUv) * 10.0) * 0.5 + 0.5;
      color.g = cos(uTime + length(vUv) * 10.0) * 0.5 + 0.5;

      vec3 final = vec3(length(newUv - 0.5));
      final = 0.13 / final;
      final = smoothstep(0.25, 0.70, final);
      color *= final;
      gl_FragColor = vec4(color, 1.0);
    }
  `}
  />
</T.Mesh>

<SheetObject
  key="Torus"
  let:Transform
>
<Transform>
<T.Points
position={[-25.993243983279243, 1.001, 2.9604570350228876]}
rotation={[1, 0, 1.5]}
scale={2}
bind:ref={torusRef}
>
  <T.TorusGeometry args={[10, 0.5, 16, 100]} />
  <T.ShaderMaterial
    wireframe={true}
    side={DoubleSide}
    transparent
  uniforms={{
    uTime: { value: 0 }
  }}
  vertexShader={` 
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `}
  fragmentShader={` 
    float random(vec2 p){
      return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    varying vec2 vUv;
    uniform float uTime;
    void main() { 
      vec2 newUv = vUv;
      vec3 color = vec3(1.0, 2.0, 3.0);
      color.r = sin(uTime + length(vUv) * 10.0) * 0.5 + 0.5;
      color.g = cos(uTime + length(vUv) * 10.0) * 0.5 + 0.5;

      newUv.y += sin(uTime * 10.0 + newUv.x * 200.0);
      newUv.x += cos(uTime * 10.0 + newUv.y * 200.0);

      vec3 final = vec3(length(newUv));
      final = 0.13 / final;
      final = smoothstep(0.25, 0.70, final);
      color *= final;
    

      gl_FragColor = vec4(final, 1.0);
    }
  `}
    />
</T.Points>
</Transform>
</SheetObject>
