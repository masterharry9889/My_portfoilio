import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './MagicBento.css'

export function MagicBentoCard({ children, title, subtitle, colSpan = 1, rowSpan = 1, delay = 0, color = 'rgba(108,99,255,0.2)' }) {
  const ref = useRef()
  const [hover, setHover] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15 // max 7.5 deg
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 15
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setHover(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={`magic-bento-card col-span-${colSpan} row-span-${rowSpan}`}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, type: 'spring' }}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--hover-color': color,
        transform: hover ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)` : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      }}
    >
      <div className="magic-bento-card__inner">
        {title && <h3 className="magic-bento-card__title">{title}</h3>}
        {subtitle && <p className="magic-bento-card__subtitle">{subtitle}</p>}
        <div className="magic-bento-card__content">
          {children}
        </div>
      </div>
      
      {/* Glow effect that tracks mouse center loosely via tilt values */}
      <div 
        className="magic-bento-card__glow" 
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, var(--hover-color), transparent 60%)`
        }} 
      />
    </motion.div>
  )
}

export function MagicBentoGrid({ children }) {
  return (
    <div className="magic-bento-grid">
      {children}
    </div>
  )
}
