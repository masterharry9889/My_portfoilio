import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { FaArrowLeft, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { profile } from '../data/profile'
import img1 from './image/download.png'
import img2 from './image/download-Photoroom.png'
import img3 from './image/download (1).png'
import img4 from './image/download (1)-Photoroom.png'
import Contact from './Contact'
import GLBViewer from './GLBViewer'
import './ProfilePage.css'
import './About.css'

// ─── Animated orb (reused from About) ───────────────────
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
        <MeshDistortMaterial color="#6c63ff" distort={0.3} speed={1.8} roughness={0.05} metalness={0.9} emissive="#1a0aff" emissiveIntensity={0.25} />
      </Sphere>
    </Float>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

export default function ProfilePage({ onBack }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const infoRef = useRef(null)
  const statsRef = useRef(null)
  const infoInView = useInView(infoRef, { once: true, margin: '-60px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 18
    setTilt({ x, y })
  }

  const socials = [
    { icon: FaGithub,   href: profile.socials.github,    label: 'GitHub',   color: '#fff' },
    { icon: FaLinkedin, href: profile.socials.linkedin,   label: 'LinkedIn', color: '#0a66c2' },
    { icon: FaXTwitter, href: profile.socials.twitter,    label: 'Twitter',  color: '#fff' },
    { icon: FaEnvelope, href: profile.socials.email,      label: 'Email',    color: '#EA4335' },
  ]

  return (
    <div className="profile-page">
      {/* Fixed nav */}
      <nav className="pp-nav">
        <button className="pp-nav__back" onClick={onBack}>
          <FaArrowLeft /><span>BACK</span>
        </button>
        <div className="pp-nav__logo">
          <span className="pp-nav__bracket">&lt;</span>AV<span className="pp-nav__bracket">/&gt;</span>
        </div>
        <a href={profile.socials.github} target="_blank" rel="noreferrer" className="pp-nav__gh">
          <FaGithub /> GitHub
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <header className="prof-hero">
        {/* Robot model on the right */}
        <div className="prof-hero__model">
          <GLBViewer url="/small_robot.glb" scale={0.9} position={[0, -1.0, 0]} isFloat={true} preset="dawn" ambientIntensity={0.8} dirIntensity={1} />
        </div>
        <div className="prof-hero__overlay" />

        <div className="prof-hero__content">
          <motion.div className="prof-hero__tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            // USER_PROFILE
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {profile.name.split(' ')[0]}<br /><span className="gradient-text">{profile.name.split(' ')[1]}</span>
          </motion.h1>
          <motion.p className="prof-hero__title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {profile.title}
          </motion.p>
          {/* Social icons row */}
          <motion.div className="prof-hero__socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                 className="prof-hero__social" title={label} style={{ '--sc': color }}>
                <Icon />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="prof-hero__scan" />
      </header>

      {/* ── STATS STRIP ──────────────────────────────── */}
      <div className="prof-stats" ref={statsRef}>
        {Object.entries(profile.stats).map(([key, val], i) => (
          <motion.div key={key} className="prof-stats__item"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}>
            <span className="prof-stats__val">{val}</span>
            <span className="prof-stats__key">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </motion.div>
        ))}
      </div>

      {/* ── ABOUT SECTION ────────────────────────────── */}
      <section className="prof-about" id="about" ref={infoRef}>
        <div className="section-container prof-about__inner">

          {/* Photo column */}
          <motion.div className="prof-about__photo-col"
            initial={{ opacity: 0, x: -50 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}>
            <div className="about__photo-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              style={{ transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}>
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
                  <motion.img key={i} src={src} alt={`Anime persona ${i}`} className="about__photo"
                    initial={{ opacity: 0, scale: 0.8, rotate: (i - 1.5) * 5 }}
                    animate={infoInView ? { opacity: 1, scale: 1, rotate: (i - 1.5) * 5 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, type: 'spring' }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    style={{ position: i === 3 ? 'relative' : 'absolute', top: 0, left: 0, transformOrigin: 'bottom center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                ))}
                <div className="about__photo-glow" />
              </div>
              <div className="about__badge about__badge--tl"><span className="about__badge-icon">🤖</span> AI Engineer</div>
              <div className="about__badge about__badge--br"><span className="about__badge-icon">🐍</span> Python Dev</div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="prof-about__text-col">
            <motion.span className="section-tag" variants={fadeUp} custom={0} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              ✦ About Me
            </motion.span>
            <motion.h2 className="section-title" variants={fadeUp} custom={1} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              Crafting Intelligent<br /><span className="gradient-text">Digital Experiences</span>
            </motion.h2>
            <motion.p className="about__bio" variants={fadeUp} custom={2} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              {profile.bio}
            </motion.p>
            <motion.p className="about__bio" variants={fadeUp} custom={3} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              {profile.bio2}
            </motion.p>

            {/* Education */}
            <motion.div className="prof-edu" variants={fadeUp} custom={4} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              <div className="prof-edu__badge">🎓</div>
              <div>
                <div className="prof-edu__degree">{profile.education.degree}</div>
                <div className="prof-edu__field">{profile.education.field} · {profile.education.year}</div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div className="about__skills" variants={fadeUp} custom={5} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              <h3 className="about__skills-title">Skills &amp; Technologies</h3>
              <div className="about__skills-grid">
                {profile.skills.map((skill, i) => (
                  <motion.div key={skill.name} className="about__skill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.07 }}>
                    <div className="about__skill-info">
                      <span className="about__skill-name">{skill.name}</span>
                      <span className="about__skill-pct">{skill.level}%</span>
                    </div>
                    <div className="about__skill-bar">
                      <motion.div className="about__skill-fill" style={{ background: skill.color }}
                        initial={{ width: 0 }}
                        animate={infoInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.6 + i * 0.07, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div className="about__interests" variants={fadeUp} custom={6} initial="hidden" animate={infoInView ? 'visible' : 'hidden'}>
              <h3 className="about__skills-title">Interests</h3>
              <div className="about__interest-list">
                {profile.interests.map((item, i) => (
                  <motion.span key={i} className="about__interest-pill"
                    initial={{ opacity: 0, y: 10 }}
                    animate={infoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.06 }}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  )
}
