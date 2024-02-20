<script>
  import { useGltf, Environment } from "@threlte/extras";
  import { satelliteState } from '$lib/stores/satellite.js';
  import { useFrame } from '@threlte/core';
  import { ShaderMaterial } from 'three';
  import { onMount } from 'svelte';

  export let scene;

  const satelliteModel = useGltf('/models/satellite.glb', { useDraco: true});

  satelliteModel.then((val)=>{
    val.scene.scale.set(10, 10, 10);
    val.scene.position.set(0, -28, 0);
    Object.entries(val.nodes).map(element => {
      let [key, value] = element;
      satelliteState.update((state) => {
        return {
          ...state,
          [key]: value
        }
      })
    })
    scene.add(val.scene);
  })

</script>


<Environment
  path="/textures/"
  files={'envMap.hdr'}
/>



