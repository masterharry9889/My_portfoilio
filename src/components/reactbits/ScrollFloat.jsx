import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollFloat({ text, className = '', tag = 'h2', delayOffset = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  // Split text by lines and spaces
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delayOffset * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -45,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const Tag = motion[tag] || motion.div

  return (
    <Tag
      ref={ref}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, idx) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
          key={idx}
        >
          {word === '<br/>' ? <br style={{ display: 'block', width: '100%' }} /> : word}
        </motion.span>
      ))}
    </Tag>
  )
}
