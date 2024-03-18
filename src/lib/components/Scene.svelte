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
let allowRayMarching = true;
let rayMarchingRefAnimated = false;

onMount(async ()=> {
  const lenis = new Lenis({
    duration: 2
  });

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  // function getOs() {
  //   const userAgent = navigator.userAgent;
  //   if (userAgent.indexOf("Windows") !== -1 || userAgent.indexOf("Macintosh") !== -1 || userAgent.indexOf("Linux") !== -1 ) return true;
  //   return false;
  // }
  //
  // allowRayMarching = getOs();

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
      if(!rayMarchingRefAnimated) {
        animated = true;
        animate({
          targets: rayMarchingMaterialRef.uniforms.iArmsMultiplier,
          value: 4.0,
          duration: 7000,
          loop: true,
          easing: 'easeInOutExpo',
          direction: 'alternate'

        })

        animate({
          targets: rayMarchingMaterialRef.uniforms.blueMultiplier,
          value: 6.0,
          duration: 4000,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutExpo'
        })

        animate({
          targets: rayMarchingMaterialRef.uniforms.purpleMultiplier,
          value: 2.0,
          duration: 4000,
          loop: true,
          direction: 'alternate',
          easing: 'easeInOutExpo'
        })
      }
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
varying vec2 vUv;
int windows = 0;
vec2 m = vec2(2.,6.);
const float pi = 3.141592;

const mat2 m2 = mat2(.8,.6,-.6,.8);


float noise(in vec2 p){

    float res=0.;
    float f=2.;
	for( int i=0; i< 4; i++ ) 
	{		
        p=m2*p*f+.6;     
        f*=1.0;
        res+=sin(p.x+sin(2.*p.y));
	}        	
	return res/4.;
}


float fbmabs( vec2 p ) {
	
	float f=1.;   
	float r = 0.0;	
    for(int i = 0;i<8;i++){	
		r += abs(noise( p*f ))/f;       
	    f *=2.;
        p-=vec2(-.01,.08)*r;
	}
	return r;
}

float fbmstars( vec2 p ) {
    
    p=floor(p*50.)/50.;
	
	float f=1.;   
	float r = 0.0;	
    for(int i = 1;i<5;i++){	
		r += noise( p*(20.+3.*f) )/f; 
        p*=m2;
	    f +=1.;
        
	}
	return pow(r,8.);
}

float fbmdisk( vec2 p ) {
	
	float f=1.;   
	float r = 0.0;	
    for(int i = 1;i<7;i++){	
		r += abs(noise( p*(f) ))/f;       
	    f +=1.;
        
	}
	return 1./r;
}


float fbmdust( vec2 p ) {
	
	float f=1.;   
	float r = 0.0;	
    for(int i = 1;i<7;i++){	
		r += 1./abs(noise( p*(f) ))/f;       
	    f +=1.;
        
	}
	return pow(1.-1./r,4.);
}


float theta(float r, float wb, float wn){
	return atan(exp(1./r)/wb)*2.*wn;
}

float arm(float n, float aw, float wb, float wn,vec2 p){
    float t = atan(p.y,p.x);
    float r = length(p);    
	return pow(1.-.15*sin((theta(r,wb,wn)-t)*n),aw)*exp(-r*r)*exp(-.07/r);
}

vec2 maparm(float n, float aw, float wb, float wn,vec2 p){
    float t = atan(p.y,p.x);
    float r = length(p);
    
	return vec2((theta(r,wb,wn)-t)*n,r);
}

float bulb(vec2 p){
    float r = exp(-dot(p,p)*1.2);
    p.y-=.2;
	return r+.5*exp(-dot(p,p)*12.);
}

float map(vec2 p){

    
    float a= arm(m.x,6.,.7,m.y,p);
    float d = fbmdust(p);
    float r = max(a*(.4+.1*arm(m.x+1.,4.,.7,m.y,p*m2))*(.1+.6*d+.4*fbmdisk(p)),bulb(p)*(.7+.2*d+.2*fbmabs(p)));
    return max(r, a*fbmstars(p*4.));
}


vec2 rotate(in vec2 p, in float t)
{
	return p * cos(-t) + vec2(p.y, -p.x) * sin(-t);
}

uniform float iTime;	
uniform float iArmsMultiplier;
uniform float blueMultiplier;
uniform float purpleMultiplier;
void main() {
	
	vec2 p = vUv - 0.5;
    p*=2.;
	if(p.y>0.){
    	if(p.x>0.)windows =1;
    	else    windows =0;}
    else{
    	if(p.x>0.)windows =3;
        else windows =2;}
    
    
    p = rotate(p,-.02*iTime);
    
    m.y*=iArmsMultiplier;
    
	float r;
    vec3 light = normalize(vec3(4., 2., -1.));

    float k=1.5*map(p);
    float b=.3*map(p*m2)+.4;
    r=.2;
   
	gl_FragColor = clamp(vec4(r*k*k * blueMultiplier, r*k * purpleMultiplier, k*.5+b*.5, 0.1),0.,1.);
}
  `}
    `}
  />
</T.Mesh>
{/if}
