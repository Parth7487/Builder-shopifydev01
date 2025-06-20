import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Octahedron } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({
  position,
  children,
  speed = 1,
  rotationSpeed = 1,
}: {
  position: [number, number, number];
  children: React.ReactNode;
  speed?: number;
  rotationSpeed?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ref.current.rotation.x += 0.01 * rotationSpeed;
      ref.current.rotation.y += 0.01 * rotationSpeed;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
    </mesh>
  );
};

const FloatingShapes = () => {
  return (
    <>
      <FloatingShape position={[-8, 2, -5]} speed={0.8} rotationSpeed={0.5}>
        <Sphere args={[0.5]}>
          <meshStandardMaterial
            color="#00FFB2"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </FloatingShape>

      <FloatingShape position={[8, -1, -3]} speed={1.2} rotationSpeed={0.7}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            roughness={0.2}
            metalness={0.9}
          />
        </Box>
      </FloatingShape>

      <FloatingShape position={[-6, -3, -4]} speed={0.6} rotationSpeed={1.2}>
        <Octahedron args={[0.8]}>
          <meshStandardMaterial
            color="#00FFB2"
            transparent
            opacity={0.4}
            wireframe
          />
        </Octahedron>
      </FloatingShape>

      <FloatingShape position={[6, 4, -6]} speed={1.5} rotationSpeed={0.3}>
        <Sphere args={[0.3]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
            emissive="#00FFB2"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </FloatingShape>

      <FloatingShape position={[0, 6, -8]} speed={0.9} rotationSpeed={0.8}>
        <Box args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial
            color="#00FFB2"
            transparent
            opacity={0.5}
            roughness={0}
            metalness={1}
          />
        </Box>
      </FloatingShape>
    </>
  );
};

export default FloatingShapes;
