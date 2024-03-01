<script>
import { T } from '@threlte/core';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { Float } from '@threlte/extras';

let geometries = [];
let textRef = null;

const loader = new FontLoader();
loader.load( '/fonts/copyduck.json', function ( font ) {

  const options = {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
	}; 

	geometries[0] = new TextGeometry( `B`, options);
  geometries[1] = new TextGeometry( `M`, options);
  geometries[2] = new TextGeometry( `S`, options);
  geometries[3] = new TextGeometry( `C`, options);
  geometries[4] = new TextGeometry( `E`, options);
  geometries[5] = new TextGeometry( `U`, options);
  geometries[6] = new TextGeometry( `P`, options);
  geometries[7] = new TextGeometry( `A`, options);
  geometries[8] = new TextGeometry( `G`, options);
  geometries[9] = new TextGeometry( `R`, options);
  geometries[10] = new TextGeometry( `A`, options);
  geometries[11] = new TextGeometry( `H`, options);
  geometries[12] = new TextGeometry( `A`, options);
});

</script>

{#if geometries[12]}
<T.Group 
    bind:ref={textRef} 
    position={[-4, 7, 6]}
    rotation={[0, Math.PI / 2, 0]}
    scale={0.017}
  >

    <T.Group name="upper_text" position={[120, 0, 0]}>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[0]} rotation={[0, 0, 0.3]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[1]} position={[85, 25, 0]} rotation={[0, 0, 0.2]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[2]} position={[210, 50, 0]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[3]} position={[295, 25, 0]} rotation={[0, 0, -0.2]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[4]} position={[390, 0, 0]} rotation={[0, 0, -0.3]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
    </T.Group>

    <T.Group name="lower_text">
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[5]} position={[0, -200, 0]} rotation={[0, 0, 0.4]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[6]} position={[95, -150, 0]} rotation={[0, 0, 0.3]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>

<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[7]} position={[185, -120, 0]} rotation={[0, 0, 0.2]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[8]} position={[280, -90, 0]} rotation={[0, 0, 0.1]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[9]} position={[375, -84, 0]} rotation={[0, 0, -0.1]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[10]} position={[475, -120, 0]} rotation={[0, 0, -0.2]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[11]} position={[575, -150, 0]} rotation={[0, 0, -0.3]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[12]} position={[690, -200, 0]} rotation={[0, 0, -0.4]}>
        <T.MeshStandardMaterial color="darkorange" />
      </T.Mesh>
</Float>
    </T.Group>
      
</T.Group>
{/if}
