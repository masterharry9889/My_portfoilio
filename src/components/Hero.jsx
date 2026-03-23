import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, TorusKnot, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { profile } from '../data/profile'
import { SineWaveCanvas } from './WebGLEffects'
import ScrollFloat from './reactbits/ScrollFloat'
import './Hero.css'

// Typing animation hook
function useTypingEffect(words, delay = 100, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), delay)
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), delay / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }
    setDisplayed(word.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, delay, pauseMs])

  return displayed
}

// Starfield particles
function Stars() {
  const ref = useRef()
  const count = 3000
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50
      arr[i * 3 + 1] = (Math.random() - 0.5) * 50
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return arr
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Interactive 3D object that follows mouse
function HeroMesh() {
  const meshRef = useRef()
  const { mouse } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (mouse.y * 0.3 - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.05
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <TorusKnot ref={meshRef} args={[1, 0.32, 256, 32]} position={[3.2, 0, 0]}>
        <MeshDistortMaterial
          color="#6c63ff"
          distort={0.25}
          speed={2}
          roughness={0}
          metalness={0.9}
          emissive="#3b1fff"
          emissiveIntensity={0.4}
          wireframe={false}
        />
      </TorusKnot>
    </Float>
  )
}

// Floating orbs
function Orbs() {
  const group = useRef()
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })
  return (
    <group ref={group}>
      {[
        { pos: [-4, 2, -3], color: '#38bdf8', size: 0.5 },
        { pos: [4, -2, -4], color: '#f472b6', size: 0.35 },
        { pos: [-3, -3, -2], color: '#34d399', size: 0.3 },
      ].map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Hero() {
  const typed = useTypingEffect(profile.taglines, 80, 2200)

  return (
    <section id="home" className="hero">
      {/* Three.js Background */}
      <div className="hero__canvas">
        <SineWaveCanvas />
      </div>

      {/* Content */}
      <div className="section-container hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="hero__greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ✦ Hello, I&apos;m
          </motion.span>

          <ScrollFloat 
            tag="h1" 
            className="hero__name" 
            text="Aniket <br/> Verma" 
            delayOffset={0.2} 
          />

          <div className="hero__typed-wrap">
            <span className="hero__typed">{typed}</span>
            <span className="hero__cursor">|</span>
          </div>

          <ScrollFloat 
            tag="p"
            className="hero__bio"
            text="AI Engineer passionate about building intelligent systems. Specializing in NLP, Computer Vision & Machine Learning."
            delayOffset={0.4}
          />

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }}>
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {Object.entries(profile.stats).map(([key, val]) => (
              <div key={key} className="hero__stat">
                <span className="hero__stat-value">{val}</span>
                <span className="hero__stat-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
