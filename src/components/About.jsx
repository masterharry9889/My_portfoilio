import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { profile } from '../data/profile'
import img1 from './image/download.png'
import img2 from './image/download-Photoroom.png'
import img3 from './image/download (1).png'
import img4 from './image/download (1)-Photoroom.png'
import ScrollFloat from './reactbits/ScrollFloat'
import './About.css'

function PhotoOrb() {
  const mesh = useRef()
  useFrame(s => {
    if (mesh.current) {
      mesh.current.rotation.x = s.clock.elapsedTime * 0.15
      mesh.current.rotation.y = s.clock.elapsedTime * 0.2
    }
  })
  return (
    <Float speed={2} floatIntensity={0.6}>
      <Sphere ref={mesh} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#6c63ff" distort={0.3} speed={1.8}
          roughness={0.05} metalness={0.9}
          emissive="#1a0aff" emissiveIntensity={0.25}
        />
      </Sphere>
    </Float>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
}

export default function About() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 20
    setTilt({ x, y })
  }

  return (
    <section id="about" ref={ref}>
      <div className="section-container about__inner">
        {/* Photo Column */}
        <motion.div
          className="about__photo-col"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div
            className="about__photo-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
          >
            {/* 3D canvas behind */}
            <div className="about__photo-bg">
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[3, 3, 3]} intensity={2} color="#6c63ff" />
                <pointLight position={[-3, -3, 3]} intensity={1.5} color="#38bdf8" />
                <PhotoOrb />
              </Canvas>
            </div>
            <div className="about__photo-frame">
              {[img4, img3, img2, img1].map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Anime persona ${i}`}
                  className="about__photo"
                  initial={{ opacity: 0, scale: 0.8, rotate: (i - 1.5) * 5 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: (i - 1.5) * 5 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  style={{
                    position: i === 3 ? 'relative' : 'absolute',
                    top: 0, left: 0,
                    transformOrigin: 'bottom center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
              ))}
              <div className="about__photo-glow" />
            </div>
            {/* Floating badge */}
            <div className="about__badge about__badge--tl">
              <span className="about__badge-icon">🤖</span> AI Engineer
            </div>
            <div className="about__badge about__badge--br">
              <span className="about__badge-icon">🐍</span> Python Dev
            </div>
          </div>
        </motion.div>

        {/* Text Column */}
        <div className="about__text-col">
          <motion.span className="section-tag" variants={fadeUp} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            ✦ About Me
          </motion.span>

          <motion.h2 className="section-title" variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            Crafting Intelligent<br /><span className="gradient-text">Digital Experiences</span>
          </motion.h2>

          <motion.p className="about__bio" variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {profile.bio}
          </motion.p>
          <motion.p className="about__bio" variants={fadeUp} custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {profile.bio2}
          </motion.p>

          {/* Skills */}
          <motion.div className="about__skills" variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <h3 className="about__skills-title">Skills &amp; Technologies</h3>
            <div className="about__skills-grid">
              {profile.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="about__skill"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07 }}
                >
                  <div className="about__skill-info">
                    <span className="about__skill-name">{skill.name}</span>
                    <span className="about__skill-pct">{skill.level}%</span>
                  </div>
                  <div className="about__skill-bar">
                    <motion.div
                      className="about__skill-fill"
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: 0.6 + i * 0.07, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div className="about__interests" variants={fadeUp} custom={5} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <h3 className="about__skills-title">Interests</h3>
            <div className="about__interest-list">
              {profile.interests.map((item, i) => (
                <motion.span
                  key={i}
                  className="about__interest-pill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.06 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
