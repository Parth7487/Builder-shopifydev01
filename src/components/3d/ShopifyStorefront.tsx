import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Text, Box, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const ShopifyStorefront = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const { scale } = useSpring({
    scale: 1,
    from: { scale: 0 },
    config: { tension: 200, friction: 50 },
  });

  return (
    <animated.group ref={groupRef} scale={scale}>
      {/* Main device frame */}
      <RoundedBox
        args={[3, 4, 0.2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox
        args={[2.6, 3.4, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0.12]}
      >
        <meshStandardMaterial color="#0A192F" />
      </RoundedBox>

      {/* Header bar */}
      <Box args={[2.4, 0.3, 0.01]} position={[0, 1.4, 0.13]}>
        <meshStandardMaterial color="#00FFB2" />
      </Box>

      {/* Product cards */}
      <Box args={[1, 0.8, 0.01]} position={[-0.6, 0.3, 0.13]}>
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </Box>
      <Box args={[1, 0.8, 0.01]} position={[0.6, 0.3, 0.13]}>
        <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
      </Box>

      {/* Bottom navigation */}
      <Box args={[2.4, 0.4, 0.01]} position={[0, -1.4, 0.13]}>
        <meshStandardMaterial color="#00FFB2" opacity={0.8} transparent />
      </Box>

      {/* Floating elements */}
      <Box args={[0.2, 0.2, 0.2]} position={[-2, 1, 1]}>
        <meshStandardMaterial color="#00FFB2" />
      </Box>
      <Box args={[0.15, 0.15, 0.15]} position={[2.2, -0.5, 0.8]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[-1.8, -1.2, 1.2]}>
        <meshStandardMaterial color="#00FFB2" />
      </Box>

      {/* Shopify logo placeholder */}
      <Text
        position={[0, 1.4, 0.14]}
        fontSize={0.15}
        color="#0A192F"
        anchorX="center"
        anchorY="middle"
      >
        SHOPIFY
      </Text>
    </animated.group>
  );
};

export default ShopifyStorefront;
