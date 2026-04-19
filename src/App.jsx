import { useState, useCallback, useEffect } from 'react'
import Loader from './components/Loader'
import ChoiceScreen from './components/ChoiceScreen'
import ProjectsPage from './components/ProjectsPage'
import ProfilePage from './components/ProfilePage'
import RibbonCursor from './components/reactbits/RibbonCursor'
import './App.css'

const PHASE_LOADING  = 'loading'
const PHASE_CHOICE   = 'choice'
const PHASE_PROJECTS = 'projects'
const PHASE_PROFILE  = 'profile'

export default function App() {
  const [phase, setPhase]       = useState(PHASE_LOADING)
  const [flash, setFlash]       = useState(false)   // white-flash warp overlay
  const [pageVisible, setPageVisible] = useState(false)

  // Lock body scroll on loader / choice
  useEffect(() => {
    const locked = phase === PHASE_LOADING || phase === PHASE_CHOICE
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [phase])

  // Loader → choice
  const handleLoadComplete = useCallback(() => {
    setPhase(PHASE_CHOICE)
  }, [])

  // Choice → page  (immersive dark fade)
  const handleSelect = useCallback((dest) => {
    // 1. Trigger dark fade
    setFlash(true)
    setTimeout(() => {
      // 2. Switch page while screen is dark
      setPhase(dest === 'projects' ? PHASE_PROJECTS : PHASE_PROFILE)
      setPageVisible(false)
      // 3. Fade dark transition out
      setTimeout(() => {
        setFlash(false)
        setPageVisible(true)
        window.scrollTo({ top: 0, behavior: 'instant' })
      }, 150)
    }, 450)
  }, [])

  // Page → choice  (back button)
  const handleBack = useCallback(() => {
    setFlash(true)
    setTimeout(() => {
      setPhase(PHASE_CHOICE)
      setPageVisible(false)
      setTimeout(() => setFlash(false), 200)
    }, 450)
  }, [])

  return (
    <>
      <RibbonCursor />

      {/* ── Warp flash overlay ── */}
      <div className={`warp-flash ${flash ? 'warp-flash--active' : ''}`} />

      {/* ── Loader ── */}
      {phase === PHASE_LOADING && (
        <Loader onComplete={handleLoadComplete} />
      )}

      {/* ── Choice screen ── */}
      {phase === PHASE_CHOICE && (
        <ChoiceScreen onSelect={handleSelect} />
      )}

      {/* ── Projects page ── */}
      {phase === PHASE_PROJECTS && (
        <div className={`page-wrapper ${pageVisible ? 'page-wrapper--visible' : ''}`}>
          <ProjectsPage onBack={handleBack} />
        </div>
      )}

      {/* ── Profile page ── */}
      {phase === PHASE_PROFILE && (
        <div className={`page-wrapper ${pageVisible ? 'page-wrapper--visible' : ''}`}>
          <ProfilePage onBack={handleBack} />
        </div>
      )}
    </>
  )
}
