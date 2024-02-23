<script>
import { useThrelte, T } from '@threlte/core';
import { useGltf, OrbitControls, Grid } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { BoxGeometry, EquirectangularReflectionMapping } from 'three';
import Satellite from '$lib/components/models/satellite.svelte'
import { onMount } from 'svelte';

const { scene } = useThrelte();
const rgbeLoader = new RGBELoader();

onMount(()=> {
  rgbeLoader.load('/textures/envMap.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.environment = texture;
  });
})
</script>

<T.AmbientLight intensity={20.5} />
<T.DirectionalLight intensity={20.5} position={[0, 10, 0]} />

<T.PerspectiveCamera makeDefault position={[7.7266769, 5.5387504, 1.043835294]} rotation={[-1.3239, 1.355862, 1.318359351]} >
</T.PerspectiveCamera>

<Satellite position={[0, 0, 0]} />

<Grid>
</Grid>
