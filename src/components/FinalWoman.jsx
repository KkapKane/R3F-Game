/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.1 public/models/FinalWoman.gltf
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import { useCharacterAnimation } from "../context/CharacterAnimation";

const FinalWoman = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./models/FinalWoman.gltf");
  const { setAnimations, animationIndex, setAnimationIndex } =
    useCharacterAnimation();
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    setAnimations(names);
  }, [names]);

  useEffect(() => {
    actions[names[animationIndex]].reset().fadeIn(0.5).play();

    return () => {
      actions[names[animationIndex]].fadeOut(0.5);
    };
  }, [animationIndex]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Armature' rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig1Hips} />
          <skinnedMesh
            name='Ch29'
            geometry={nodes.Ch29.geometry}
            material={materials.Ch29_Body}
            skeleton={nodes.Ch29.skeleton}
            castShadow
          ></skinnedMesh>
        </group>
      </group>
    </group>
  );
};

export default FinalWoman;
useGLTF.preload("./models/FinalWoman.gltf");
