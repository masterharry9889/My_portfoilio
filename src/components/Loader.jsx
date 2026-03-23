import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import './Loader.css'

function AnimatedSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#6c63ff"
          attach="material"
          distort={0.55}
          speed={2.5}
          roughness={0.1}
          metalness={0.8}
          emissive="#2a1fff"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

function ParticleRing() {
  const points = useRef()
  const count = 2000
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 2.5 + (Math.random() - 0.5) * 0.8
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.15
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#38bdf8" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 4 + 1.5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setFading(true)
          setTimeout(onComplete, 700)
        }, 400)
      }
      setProgress(Math.min(p, 100))
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`loader ${fading ? 'loader--fade' : ''}`}>
      <div className="loader__canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#6c63ff" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#38bdf8" />
          <AnimatedSphere />
          <ParticleRing />
        </Canvas>
      </div>
      <div className="loader__content">
        <div className="loader__name">AV</div>
        <div className="loader__text">
          <span className="loader__label">INITIALIZING PORTFOLIO</span>
          <span className="loader__percent">{Math.round(progress)}%</span>
        </div>
        <div className="loader__bar-track">
          <div className="loader__bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader__tagline">AI Engineer · Developer · Creator</div>
      </div>
    </div>
  )
}
