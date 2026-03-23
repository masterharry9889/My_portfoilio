import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // Determine active section
      const sections = ['home', 'about', 'projects', 'contact']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a className="navbar__logo" href="#home" onClick={() => handleNav('#home')}>
            <span className="navbar__logo-bracket">&lt;</span>
            AV
            <span className="navbar__logo-bracket">/&gt;</span>
          </a>

          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  className={`navbar__link ${active === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                >
                  {link.label}
                  {active === link.href.replace('#', '') && (
                    <motion.span className="navbar__link-dot" layoutId="nav-dot" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn-primary navbar__cta" onClick={(e) => { e.preventDefault(); handleNav('#contact') }}>
            Hire Me
          </a>

          <button className={`navbar__burger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                className="navbar__mobile-link"
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
