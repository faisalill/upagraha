<script>
import { useThrelte, T } from '@threlte/core';
import { OrbitControls, Grid, Float } from '@threlte/extras';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { BoxGeometry, EquirectangularReflectionMapping } from 'three';
import Satellite from '$lib/components/models/satellite.svelte'
import { onMount } from 'svelte';
import { injectLookAtPlugin } from '$lib/plugins/lookAtPlugin'
import { SheetObject } from '@threlte/theatre';

injectLookAtPlugin()

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

<Grid>
</Grid>
