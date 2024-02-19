<script>
import { useThrelte, T } from '@threlte/core';
import { useGltf, OrbitControls, Edges } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EquirectangularReflectionMapping } from 'three';
import Satellite from '$lib/components/models/satellite.svelte';
import { onMount } from 'svelte';

const { scene } = useThrelte();
const satelliteModel = useGltf('/models/satellite.glb', { useDraco: true});
const rgbeLoader = new RGBELoader();

onMount(()=> {
 // satelliteModel.then((val)=>{
 //  scene.add(val.scene);
 //  }) 
  rgbeLoader.load('/textures/envMap.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  });
})
</script>

<T.AmbientLight intensity={20.5} />
<T.DirectionalLight intensity={20.5} position={[0, 10, 0]} />

<T.PerspectiveCamera makeDefault position={[30, 0, 50]} >
  <OrbitControls />
</T.PerspectiveCamera>

<Satellite position={[0, -29, 0]} scale={10}>
</Satellite>
