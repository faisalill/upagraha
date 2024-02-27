<script>
  import { T, useThrelte, useRender } from '@threlte/core'
  import { Grid, OrbitControls, InstancedMesh, Instance,} from '@threlte/extras'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
  import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
  import { Vector2 } from 'three'
  import { onMount } from 'svelte';

  let gui;

  let torusRef = null
  let eyeCandyBackground = null
  let torusMaterial = null
  let torusGeometry = null
  let torusParams = {
    radius: 29,
    tube: 4, radialSegments: 19, tubularSegments: 67 };

  let bloomParams = {
    resolution: new Vector2(window.innerWidth, window.innerHeight),
    strength: 1.5,
    radius: 0.4,
    threshold: 0.85,
  };
  
  let effectComposer;
  let unrealBloomPass;

  const { camera, renderer, scene } = useThrelte();

  onMount(async() => {
    const dat = await import('dat.gui'); 
    gui = new dat.GUI();

    effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(window.innerWidth, window.innerHeight);

    const renderPass = new RenderPass( scene, camera.current);
    effectComposer.addPass(renderPass);

    unrealBloomPass = new UnrealBloomPass(bloomParams);
    effectComposer.addPass(unrealBloomPass)

    gui.add(bloomParams, 'strength').min(0.0).max(10.0).step(0.01).onChange((value) => {
      unrealBloomPass.strength = value;
    }).name("Bloom Radius");

    gui.add(bloomParams, 'radius').min(0.0).max(10.0).step(0.01).onChange((value) => {
      unrealBloomPass.radius = value;
    }).name("Bloom Radius");

    gui.add(bloomParams, 'threshold').min(0.0).max(10.0).step(0.01).onChange((value) => {
      unrealBloomPass.threshold = value;
    }).name("Bloom Threshold");

    gui.add(bloomParams.resolution, 'x').min(0).max(window.innerWidth).step(1).onChange((value) => {
      effectComposer.setSize(value, bloomParams.resolution.y);
    }).name("Resolution X");

    gui.add(bloomParams.resolution, 'y').min(0).max(window.innerHeight).step(1).onChange((value) => {
      effectComposer.setSize(bloomParams.resolution.x, value);
    }).name("Resolution Y");

    gui.add(torusParams, 'radius').min(0).max(80).step(1).onChange((value) => {
      torusParams.radius = value;
    }).name('Torus Radius');

    gui.add(torusParams, 'tube').min(0).max(80).step(1).onChange((value) => {
      torusParams.tube = value;
    }).name('Torus Tube');

    gui.add(torusParams, 'radialSegments').min(0).max(200).step(1).onChange((value) => {
      torusParams.radialSegments = value;
    }).name('Radial Segments');

    gui.add(torusParams, 'tubularSegments').min(0).max(200).step(1).onChange((value) => {
      torusParams.tubularSegments = value;
    }).name('Tubular Segments');

    gui.add(torusMaterial.uniforms.noise_frequency, 'value').min(0).max(80).step(0.01).onChange((value) => {
      torusMaterial.uniforms.noise_frequency.value = value;
    }).name('Noise Frequency');

    gui.add(torusMaterial.uniforms.noise_repetition, 'value').min(0).max(100).step(0.01).onChange((value) => {
      torusMaterial.uniforms.noise_repetition.value = value;
    }).name("Noise Repetition");

    gui.add(torusMaterial.uniforms.point_size, 'value').min(0).max(100).step(0.01).onChange((value) => {
      torusMaterial.uniforms.point_size.value = value;
    }).name("Point Size");

    gui.add(torusMaterial.uniforms.time_multiplier, 'value').min(0).max(10).step(0.01).onChange((value) => {
      torusMaterial.uniforms.time_multiplier.value = value;
    }).name("Time Multiplier");
  })

  useRender(() => {
    if(torusRef) {
      if(torusRef.rotation.x !== 1){
        torusRef.rotation.x = 1;
      }
      torusRef.rotation.z = Math.sin(torusMaterial.uniforms.time.value * 2.0 / 13.0)
      torusMaterial.uniforms.time.value += 0.01
    }
    if(eyeCandyBackground) {
      eyeCandyBackground.material.uniforms.uTime.value += 0.01;
    }
    if(effectComposer) {
      effectComposer.render();
    }
  })
</script>


<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<T.Group
  position={[-80, 0, 0]}
>

<T.Points bind:ref={torusRef} 
  position={[-95, 0, 0]}
  scale={1.8}
>
  <T.TorusGeometry 
    bind:ref={torusGeometry}
    args={[
      torusParams.radius,
      torusParams.tube,
      torusParams.radialSegments,
      torusParams.tubularSegments
    ]}
  />
  <T.ShaderMaterial bind:ref={torusMaterial}
    uniforms={{
      time: { value: 1.0 },
      noise_frequency: { value: 28.45 },
      noise_repetition: { value: 18.22 },
      point_size: { value: 6.0 },
      time_multiplier: { value: 1.0 }
    }}
    vertexShader={`
        vec3 mod289(vec3 x)
        {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x)
        {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x)
        {
          return mod289(((x*34.0)+10.0)*x);
        }

        vec4 taylorInvSqrt(vec4 r)
        {
          return 1.79284291400159 - 0.85373472095314 * r;
        }

        vec3 fade(vec3 t) {
          return t*t*t*(t*(t*6.0-15.0)+10.0);
        }   

         float pnoise(vec3 P, vec3 rep)
        {
          vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
          vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
          Pi0 = mod289(Pi0);
          Pi1 = mod289(Pi1);
          vec3 Pf0 = fract(P); // Fractional part for interpolation
          vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 * (1.0 / 7.0);
          vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 * (1.0 / 7.0);
          vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
        } 
      varying vec2 vUv;
      uniform float time;
      uniform float noise_frequency;
      uniform float noise_repetition;
      uniform float point_size;
      uniform float time_multiplier;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float noise = pnoise(pos, vec3(noise_repetition));
        float displacement = 0.5 * noise * noise_frequency;
        pos = position + normal * displacement ;
        gl_PointSize = point_size;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `}
    fragmentShader={`
      varying vec2 vUv;
      uniform float time;
      void main() {
        vec3 color = vec3(1.0, 2.0, 3.0);
        
        color.r = sin(vUv.x * 10.0 + time);
        color.g = sin(vUv.y * 10.0 + time);

        vec2 newUv = fract(vUv * 10.0);
        float variation = sin(vUv.x + time) ;
        variation = smoothstep(0.0, 1.0, variation);
        variation = 0.08/ variation;
        variation = clamp(variation, 0.25, 0.5);

        vec3 finalColor = vec3(vec3(color + sin(time * 2.0) / 2.0) * vec3(variation));

        vec3 final = vec3(gl_FragCoord * 0.002 - 0.5);
        gl_FragColor = vec4(final, 1.0);
      }
    `}
    />
</T.Points>

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

</T.Group>
