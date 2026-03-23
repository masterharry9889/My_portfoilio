import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// === SINE WAVE PARTICLE FIELD (inspired by domenicobrz webgl sketches) ===
function SineWaveParticles() {
  const ref = useRef()
  const timeRef = useRef(0)

  const { positions, count } = useMemo(() => {
    const cols = 120
    const rows = 60
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i++] = (c / cols - 0.5) * 28
        positions[i++] = (r / rows - 0.5) * 14
        positions[i++] = 0
      }
    }
    return { positions, cols, rows, count }
  }, [])

  const posRef = useRef(positions.slice())

  useFrame((state) => {
    if (!ref.current) return
    timeRef.current = state.clock.elapsedTime
    const t = timeRef.current
    const pos = ref.current.geometry.attributes.position

    let i = 0
    for (let r = 0; r < 60; r++) {
      for (let c = 0; c < 120; c++) {
        const x = (c / 120 - 0.5) * 28
        const y = (r / 60 - 0.5) * 14
        const wave1 = Math.sin(x * 0.4 + t * 0.7) * 0.8
        const wave2 = Math.sin(y * 0.5 + t * 0.5) * 0.6
        const wave3 = Math.sin((x + y) * 0.3 + t * 1.1) * 0.5
        pos.array[i * 3] = x
        pos.array[i * 3 + 1] = y + wave1 + wave2
        pos.array[i * 3 + 2] = wave3 + wave2
        i++
      }
    }
    pos.needsUpdate = true
    ref.current.rotation.y = Math.sin(t * 0.08) * 0.15
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#6c63ff"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  )
}

// Bright accent dots scattered on top
function AccentDots() {
  const ref = useRef()
  const count = 300
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  }, [])

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#f472b6" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Grid tunnel — depth-scrolling perspective grid
function GridTunnel() {
  const ref = useRef()
  const lineCount = 20
  const linePts = useMemo(() => {
    const pts = []
    for (let i = 0; i < lineCount; i++) {
      const z = (i / lineCount) * -30
      // horizontal
      pts.push(-8, -4, z, 8, -4, z)
      pts.push(-8, 4, z, 8, 4, z)
      // vertical
      pts.push(-8, -4, z, -8, 4, z)
      pts.push(8, -4, z, 8, 4, z)
    }
    return new Float32Array(pts)
  }, [])

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.z = ((s.clock.elapsedTime * 1.5) % 1.5)
      ref.current.rotation.z = s.clock.elapsedTime * 0.04
    }
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={linePts.length / 3} array={linePts} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.12} />
    </lineSegments>
  )
}

export function SineWaveCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 65 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <SineWaveParticles />
      <AccentDots />
    </Canvas>
  )
}

export function TunnelCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <GridTunnel />
    </Canvas>
  )
}
