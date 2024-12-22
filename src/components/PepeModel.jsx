import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function PepeModel({ mousePosition }) {
  const group = useRef();
  const { scene } = useGLTF('/models/pepe.glb');

  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const currentRotation = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state, delta) => {
    if (!group.current) return;

    targetRotation.current.y = (mousePosition.x - 0.5) * Math.PI * 0.3;
    targetRotation.current.x = (mousePosition.y - 0.5) * Math.PI * 0.2;

    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 3 * delta;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 3 * delta;

    group.current.rotation.x = currentRotation.current.x;
    group.current.rotation.y = currentRotation.current.y;

    // Añadir un suave movimiento de flotación
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={10}  // Aumentado el tamaño
        position={[0, -1, -4]}  // Movido más atrás en el eje Z
      />
    </group>
  );
}

export default PepeModel;