<script>
import { T, useFrame, forwardEventHandlers } from '@threlte/core';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { Float } from '@threlte/extras';
import { SheetObject } from '@threlte/theatre'
import { textAnimation } from '$lib/animations/text.js'
import { Group } from 'three';

let geometries = [];
let animated = false;
export const ref = new Group();
const component = forwardEventHandlers()


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

const textColors = {
  orange: '#6d3d16',
  red: '#751c1c',
  blue: '#0c5160' 
}

  useFrame((_, delta) => {
    if(ref && !animated) {
      animated = true;
      textAnimation(ref);
  }  
  });
</script>

{#if geometries[12]}
<T 
    dispose={false} {...$$restProps} 
    bind:this={$component}
    is={ref} 
  >

    <T.Group name="upper_text" position={[120, 0, 0]}>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <SheetObject 
        key="check"
        let:Sync
>
      <T.Mesh geometry={geometries[0]} rotation={[0, 0, 0.3]} position={[0, -2000, 0]}>
        <T.MeshStandardMaterial color={textColors.orange}>
            <Sync color />
        </T.MeshStandardMaterial>
      </T.Mesh>
      </SheetObject>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[1]} position={[85, -2000, 0]} rotation={[0, 0, 0.2]}>
        <T.MeshStandardMaterial color={textColors.red} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[2]} position={[210, -2000, 0]}>
        <T.MeshStandardMaterial color={textColors.orange} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[3]} position={[295, -2000, 0]} rotation={[0, 0, -0.2]}>
        <T.MeshStandardMaterial color={textColors.red} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[4]} position={[390, -2000, 0]} rotation={[0, 0, -0.3]}>
        <T.MeshStandardMaterial color={textColors.orange} />
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
      <T.Mesh geometry={geometries[5]} position={[0, -2000, 0]} rotation={[0, 0, 0.4]}>
        <T.MeshStandardMaterial color={textColors.red} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[6]} position={[95, -2000, 0]} rotation={[0, 0, 0.3]}>
        <T.MeshStandardMaterial color={textColors.orange} />
      </T.Mesh>
</Float>

<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[7]} position={[185, -2000, 0]} rotation={[0, 0, 0.2]}>
        <T.MeshStandardMaterial color={textColors.red} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[8]} position={[280, -2000, 0]} rotation={[0, 0, 0.1]}>
        <T.MeshStandardMaterial color={textColors.orange} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[9]} position={[375, -2000, 0]} rotation={[0, 0, -0.1]}>
        <T.MeshStandardMaterial color={textColors.red} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[10]} position={[475, -2000, 0]} rotation={[0, 0, -0.2]}>
        <T.MeshStandardMaterial color={textColors.orange} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[11]} position={[575, -2000, 0]} rotation={[0, 0, -0.3]}>
        <T.MeshStandardMaterial color={textColors.red} />
      </T.Mesh>
</Float>
<Float
floatIntensity={1}
rotationIntensity={0.2}
rotationSpeed={6}
speed={6}
>
      <T.Mesh geometry={geometries[12]} position={[690, -2000, 0]} rotation={[0, 0, -0.4]}>
        <T.MeshStandardMaterial color={textColors.orange} />
      </T.Mesh>
</Float>
    </T.Group>
      
</T>
{/if}
