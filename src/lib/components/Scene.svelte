<script>
import { useThrelte, T, useFrame } from '@threlte/core';
import { OrbitControls, Grid, Float, Stars, useTexture } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { BoxGeometry, EquirectangularReflectionMapping, TorusGeometry } from 'three';
import Satellite from '$lib/components/models/satellite.svelte'
import { onMount } from 'svelte';
import { injectLookAtPlugin } from '$lib/plugins/lookAtPlugin'
import { Sheet, SheetObject } from '@threlte/theatre';

injectLookAtPlugin()

const { scene } = useThrelte();
const starTexture = useTexture('/textures/star.png');
const rgbeLoader = new RGBELoader();

let torusRef = null;

onMount(()=> {
  rgbeLoader.load('/textures/envMap.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  });
})

useFrame((_, delta) => {
  if(torusRef) {
    torusRef.material.uniforms.uTime.value += delta;
    if(torusRef.rotation.x !== 1) {
      torusRef.rotation.x = 1;
    }
    torusRef.rotation.z += 0.002;
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
  factor={7}
  lightness={0.4}
  speed={4}
/>

  <T.Points
    bind:ref={torusRef}
    position={[0, 4, 0]}
  >
    <T.TorusGeometry 
      args={[60, 40, 32, 50]} 
    />
    <T.ShaderMaterial  
      transparent={true}
      uniforms={{
        uTime: { value: 0},
      }}
      vertexShader={`
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_PointSize = 13.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
       fragmentShader={`
        void main() {
        vec2 uv = gl_PointCoord.xy;
        gl_FragColor = vec4(uv.x);
}
        `}
    />
  </T.Points>

<Grid>
</Grid>
