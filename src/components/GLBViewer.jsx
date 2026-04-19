import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei'

function Model({ url, scale, position, rotation, isFloat }) {
  const { scene } = useGLTF(url)
  const group = useRef()
  
  if (isFloat) {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive object={scene} scale={scale} position={position} rotation={rotation} />
      </Float>
    )
  }
  
  return <primitive ref={group} object={scene} scale={scale} position={position} rotation={rotation} />
}

export default function GLBViewer({ 
  url, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  cameraPosition = [0, 0, 5],
  autoRotate = true,
  autoRotateSpeed = 1,
  isFloat = false,
  preset = "city",
  ambientIntensity = 1,
  dirIntensity = 2
}) {
  return (
    <Canvas camera={{ position: cameraPosition, fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight position={[10, 10, 10]} intensity={dirIntensity} />
      <Environment preset={preset} />
      <Suspense fallback={null}>
        <Model url={url} scale={scale} position={position} rotation={rotation} isFloat={isFloat} />
      </Suspense>
      <OrbitControls autoRotate={autoRotate} autoRotateSpeed={autoRotateSpeed} enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
