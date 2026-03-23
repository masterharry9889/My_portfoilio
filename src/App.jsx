import { useState, useCallback } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import RibbonCursor from './components/reactbits/RibbonCursor'
import { TunnelCanvas } from './components/WebGLEffects'
import './App.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      <RibbonCursor />
      <div className={`app ${loaded ? 'app--visible' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
            <TunnelCanvas />
          </div>
          <About />
          <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
            <TunnelCanvas />
          </div>
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  )
}
