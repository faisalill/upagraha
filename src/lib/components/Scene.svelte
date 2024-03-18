<script>
import { useThrelte, T, useFrame } from '@threlte/core';
import { OrbitControls, Float, useTexture } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EquirectangularReflectionMapping } from 'three';
import Satellite from '$lib/components/models/satellite.svelte';
import GalaxyScene from '$lib/components/models/scene.svelte';
import ShootingStar from './Stars.svelte';
import Text from './Text.svelte';
import Lenis from '@studio-freight/lenis';
import { onMount } from 'svelte';
import { injectLookAtPlugin } from '$lib/plugins/lookAtPlugin';
import { cameraAnimation } from '$lib/animations/camera.js';
import { introAnimation } from '$lib/animations/intro.js';
import { scrollAnimationInit } from '$lib/animations/scroll.js';
import animate from 'animejs';

injectLookAtPlugin()

const { scene } = useThrelte();
const starTexture = useTexture('/textures/star.png');
const rgbeLoader = new RGBELoader();

let torusRef = null;
let satelliteRef = null;
let cameraRef = null;
let sceneRef = null;
let textRef = null;
let animated = false;
let rayMarchingMaterialRef = null;
let rayMarchingMeshRef = null;
let allowRayMarching = false;
let rayMarchingRefAnimated = false;

onMount(async ()=> {
  const lenis = new Lenis({
    duration: 2
  });

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  function getOs() {
    const userAgent = navigator.userAgent;
    if ( userAgent.indexOf("Macintosh") !== -1 || userAgent.indexOf("Linux") !== -1 ) return true;
    return false;
  }

  allowRayMarching = getOs();

  requestAnimationFrame(raf)
  window.addEventListener('mousemove', (e) => {
    if(cameraRef){
      cameraRef.position.z = 0.1 * -(e.clientX - window.innerWidth / 2) / 100;
      cameraRef.position.y = 0.1 * -(e.clientY - window.innerHeight / 2) / 100;
      cameraRef.lookAt(4, 0, 0);
    }
  })

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
  if(satelliteRef && !animated && scene) {
    animated = true;
    introAnimation(satelliteRef, sceneRef, cameraRef, rayMarchingMeshRef);
    cameraAnimation(cameraRef, satelliteRef);
    scrollAnimationInit(window, document, satelliteRef, cameraRef, sceneRef, textRef, rayMarchingMeshRef, scene);
  }
  if(rayMarchingMaterialRef) {
    rayMarchingMaterialRef.uniforms.uTime.value += delta;
  }
})
</script>

<T.AmbientLight intensity={8} />
<T.DirectionalLight intensity={20.5} position={[5, 10, 0]} />

<T.PerspectiveCamera 
  makeDefault
  position={[10, 5, 1]}
  bind:ref={cameraRef}
>
</T.PerspectiveCamera>

<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
<Satellite bind:ref={satelliteRef}/>
</Float>

<GalaxyScene 
  bind:ref={sceneRef}
  position={[-4, 4, 0]}
  scale = {3}
  rotation={[0, 1.5, 0]}
/>

<Text 
  bind:ref={textRef}
  position={[-4, 7, 6]}
  rotation={[0, Math.PI / 2, 0]}
  scale={0.017}
/>

{#if allowRayMarching}
<T.Mesh bind:ref={rayMarchingMeshRef} rotation={[0, Math.PI / 2, 0]}>
  <T.PlaneGeometry args={[5,5]} />
  <T.ShaderMaterial 
    bind:ref={rayMarchingMaterialRef}
    uniforms={{
      uTime: { value: 0.0 },
      iArmsMultiplier: { value: 1.0 } ,
      blueMultiplier: { value: 1.0 },
      purpleMultiplier: { value: 1.0 }
    }}
    vertexShader={`
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `}

    fragmentShader={`
      uniform float uTime;

      mat2 rot2D(float a) {
          return mat2(cos(a), -sin(a), sin(a), cos(a));
      }
      vec3 rotate3d (vec3 p, vec3 axis, float angle) {
        return mix(dot(axis,p) * axis, p, cos(angle)) + cross(axis, p) * sin(angle);
      }
      float opSmoothUnion( float d1, float d2, float k )
      {
          float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
          return mix( d2, d1, h ) - k*h*(1.0-h);
      }
      float sdBox( vec3 p, vec3 b )
      {
        vec3 q = abs(p) - b;
        return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
      }
      float sdSphere( vec3 p, float s )
      {
        return length(p)-s;
      }
      vec3 palette(float t) {
        vec3 a = vec3(0.731, 1.098, 0.192);      
        vec3 b = vec3(0.358, 1.090, 0.657);
        vec3 c = vec3(1.077, 0.360, 0.328);
        vec3 d = vec3(0.965, 2.265, 0.837);

        return a + b*cos( 6.28318*(c*t+d) );
      }

      float getDistance(vec3 p){
        p.z += uTime * 0.5;
        p.y += 80.0;
        
        vec3 repeat = p;
        repeat.xy = fract(repeat.xy) - 0.5;
        repeat.z = mod(repeat.z, 0.40) - 0.20;

        vec3 cube = vec3(0.1);
        float dCube = sdBox(repeat , cube) ;
        
        float totalDistance = dCube;

        float ground = p.y + 0.75;
        return opSmoothUnion(ground, totalDistance, 0.5); 
      }

      varying vec2 vUv;
      void main(){
        vec2 newUv = vUv - 0.5;
        newUv *= 4.0;
        vec3 color = vec3(0);
      
        vec3 ray_origin = vec3(0.0, 0.0, -3.0);
        vec3 ray_direction = normalize(vec3(newUv, 1.0)); // 1 in z direction

        float distanceTravelled = 0.0;
        int i;
        for (i = 0; i < 80; i++){
          vec3 newPoint = ray_origin + ray_direction * distanceTravelled;
          
          newPoint.xy *= rot2D(distanceTravelled * 0.2 ) / 3.;
          newPoint.y += sin(distanceTravelled * 1.0) / 8.0;

          float distanceFromBox = getDistance(newPoint);
          if (distanceFromBox < 0.01){
            break;
          }
          distanceTravelled += distanceFromBox;
          if (distanceTravelled > 100.0){
            break;
          }
        }
        color = palette(distanceTravelled * 0.015 + float(i) * 0.009);
      
        
        gl_FragColor = vec4(color, 1.0);
      }
  `}
    `}
  />
</T.Mesh>
{/if}
