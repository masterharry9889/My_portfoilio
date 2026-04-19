import { useState } from 'react'
import GLBViewer from './GLBViewer'
import './ChoiceScreen.css'

export default function ChoiceScreen({ onSelect }) {
  const [selected, setSelected] = useState(null) // null | 'projects' | 'profile'

  const handlePick = (dest) => {
    if (selected) return
    setSelected(dest)
    // Allow the CSS expand animation to run (900ms) then hand off
    setTimeout(() => onSelect(dest), 900)
  }

  return (
    <div className="choice-screen">
      {/* Ambient particles */}
      <div className="choice-screen__particles">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="choice-screen__particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Header */}
      <div className="choice-screen__header">
        <div className="choice-screen__header-line" />
        <h1>SELECT YOUR DESTINATION</h1>
        <p>WHERE DO YOU WANT TO GO?</p>
        <div className="choice-screen__header-line" />
      </div>

      {/* Split panels */}
      <div className={`choice-panels ${selected ? `choice-panels--picked-${selected}` : ''}`}>

        {/* ── LEFT: PROJECTS ── */}
        <div
          className={`choice-panel choice-panel--left ${selected === 'projects' ? 'choice-panel--expand' : ''} ${selected === 'profile' ? 'choice-panel--shrink' : ''}`}
          onClick={() => handlePick('projects')}
        >
          {/* Full-screen GLB model */}
          <div className="choice-panel__model">
            <GLBViewer url="/old_computers.glb" scale={0.8} position={[0, -1, 0]} preset="apartment" ambientIntensity={0.5} dirIntensity={1.5} />
          </div>

          {/* Dark gradient overlay */}
          <div className="choice-panel__overlay choice-panel__overlay--left" />

          {/* Vertical divider line */}
          <div className="choice-panel__edge" />

          {/* Content */}
          <div className="choice-panel__content">
            <div className="choice-panel__tag">// 01</div>
            <h2 className="choice-panel__title">PROJECTS</h2>
            <p className="choice-panel__sub">Explore the archive of builds,<br />experiments &amp; open-source work.</p>
            <div className="choice-panel__cta">
              <span className="choice-panel__cta-text">ENTER</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          {/* Hover glow sweep */}
          <div className="choice-panel__sweep" />
        </div>

        {/* ── CENTER DIVIDER ── */}
        <div className="choice-divider">
          <div className="choice-divider__line" />
          <div className="choice-divider__orb">OR</div>
          <div className="choice-divider__line" />
        </div>

        {/* ── RIGHT: PROFILE ── */}
        <div
          className={`choice-panel choice-panel--right ${selected === 'profile' ? 'choice-panel--expand' : ''} ${selected === 'projects' ? 'choice-panel--shrink' : ''}`}
          onClick={() => handlePick('profile')}
        >
          <div className="choice-panel__model">
            <GLBViewer url="/small_robot.glb" scale={0.9} position={[0, -1.0, 0]} isFloat={true} preset="dawn" ambientIntensity={0.8} dirIntensity={1} />
          </div>

          <div className="choice-panel__overlay choice-panel__overlay--right" />
          <div className="choice-panel__edge choice-panel__edge--right" />

          <div className="choice-panel__content choice-panel__content--right">
            <div className="choice-panel__tag">// 02</div>
            <h2 className="choice-panel__title">PROFILE</h2>
            <p className="choice-panel__sub">Meet the creator — skills,<br />identity &amp; professional background.</p>
            <div className="choice-panel__cta">
              <span className="choice-panel__cta-text">ENTER</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          <div className="choice-panel__sweep choice-panel__sweep--right" />
        </div>
      </div>

      {/* Footer ticker */}
      <div className="choice-screen__ticker">
        <div className="choice-screen__ticker-inner">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>NEURAL&nbsp;INTERFACE&nbsp;ACTIVE&nbsp;·&nbsp;SYSTEM&nbsp;ONLINE&nbsp;·&nbsp;SELECT&nbsp;DESTINATION&nbsp;·&nbsp;</span>
          ))}
        </div>
      </div>
    </div>
  )
}
