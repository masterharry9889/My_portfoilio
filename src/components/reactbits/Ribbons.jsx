import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RibbonMesh({ color, speed, offset, scale, yPos }) {
  const mesh = useRef()
  const clock = useRef(0)

  // Create a long ribbon geometry
  const segments = 100
  const width = 1.5
  const length = 40
  
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(length, width, segments, 1)
  }, [])

  useFrame((state, delta) => {
    if (!mesh.current) return
    clock.current += delta * speed
    
    const pos = mesh.current.geometry.attributes.position
    // Deform the plane to look like a flowing ribbon
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        // Sine wave calculations based on X position and time
        const yDistortion = Math.sin(x * 0.2 + clock.current + offset) * scale
        const zDistortion = Math.cos(x * 0.3 + clock.current * 0.8 + offset) * (scale * 0.5)
        
        // Apply only to Y and Z
        pos.setY(i, (i % 2 === 0 ? width/2 : -width/2) + yDistortion)
        pos.setZ(i, zDistortion)
    }
    pos.needsUpdate = true
  })

  return (
    <mesh ref={mesh} position={[0, yPos, -5]} rotation={[-Math.PI / 6, 0, 0]}>
      <planeGeometry args={[length, width, segments, 1]} />
      <meshPhysicalMaterial 
        color={color} 
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export default function Ribbons() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6c63ff" />
        
        <RibbonMesh color="#6c63ff" speed={1.2} offset={0} scale={2} yPos={2} />
        <RibbonMesh color="#f472b6" speed={0.8} offset={Math.PI} scale={2.5} yPos={-1} />
        <RibbonMesh color="#38bdf8" speed={1.5} offset={Math.PI / 2} scale={1.5} yPos={-4} />
      </Canvas>
    </div>
  )
}
