import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaTwitter
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { profile } from '../data/profile'
import './Contact.css'

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@masterharry9889',
    href: profile.socials.github,
    icon: FaGithub,
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.15)',
    desc: 'Check out my code & open-source projects',
  },
  {
    name: 'LinkedIn',
    handle: 'Aniket Verma',
    href: profile.socials.linkedin,
    icon: FaLinkedin,
    color: '#0a66c2',
    glow: 'rgba(10,102,194,0.25)',
    desc: 'Connect professionally & see my resume',
  },
  {
    name: 'X (Twitter)',
    handle: '@HniketVerm1408',
    href: profile.socials.twitter,
    icon: FaXTwitter,
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.1)',
    desc: 'Follow my tech thoughts & updates',
  },
  {
    name: 'Instagram',
    handle: '@aniket.verma',
    href: profile.socials.instagram,
    icon: FaInstagram,
    color: '#e1306c',
    glow: 'rgba(225,48,108,0.25)',
    desc: 'See my life beyond the code',
  },
  {
    name: 'Gmail',
    handle: 'aniketverma@gmail.com',
    href: profile.socials.email,
    icon: FaEnvelope,
    color: '#EA4335',
    glow: 'rgba(234,67,53,0.25)',
    desc: 'Drop me a message — always open to collaborate',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref}>
      <div className="section-container">
        <div className="contact__header">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            ✦ Contact
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Let&apos;s <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Whether it&apos;s a project, collaboration, or just a hello — I&apos;m always excited to connect with fellow creators and engineers.
          </motion.p>
        </div>

        <div className="contact__grid">
          {socialLinks.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="contact-card"
                style={{ '--card-color': link.color, '--card-glow': link.glow }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="contact-card__icon-wrap">
                  <Icon className="contact-card__icon" />
                  <div className="contact-card__icon-glow" />
                </div>
                <div className="contact-card__body">
                  <span className="contact-card__name">{link.name}</span>
                  <span className="contact-card__handle">{link.handle}</span>
                  <span className="contact-card__desc">{link.desc}</span>
                </div>
                <svg className="contact-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
                <div className="contact-card__bg-glow" />
              </motion.a>
            )
          })}
        </div>

        {/* Footer */}
        <motion.footer
          className="contact__footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="contact__footer-line" />
          <p className="contact__footer-text">
            Designed &amp; built by <strong>Aniket Verma</strong> · 2026
          </p>
          <p className="contact__footer-sub">
            Built with React, Three.js &amp; passion ✦
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
