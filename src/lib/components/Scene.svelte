<script>
import { useThrelte, T } from '@threlte/core';
import { useGltf, OrbitControls } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EquirectangularReflectionMapping } from 'three';
import { onMount } from 'svelte';

const { scene } = useThrelte();
const satelliteModel = useGltf('/models/satellite.glb', { useDraco: true});
const rgbeLoader = new RGBELoader();

onMount(()=> {
 satelliteModel.then((val)=>{
  scene.add(val.scene);
  }) 
  rgbeLoader.load('/textures/envMap.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  });
})
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]} >
  <OrbitControls />
</T.PerspectiveCamera>

