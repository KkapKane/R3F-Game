import { OrbitControls, Text } from "@react-three/drei";

import "../App.scss";
import FinalWoman from "./FinalWoman";

const Experience = ({ ign }) => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group position={[0, -1, 0]}>
        <mesh>
          <FinalWoman />
          <Text
            position={[0, 1.7, 0]}
            color='black'
            anchorX='center'
            anchorY='middle'
            fontSize={0.2}
          >
            {ign}
          </Text>
        </mesh>
      </group>

      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

export default Experience;
