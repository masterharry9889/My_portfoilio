import { useEffect, useState } from 'react'
import GLBViewer from './GLBViewer'
import './Loader.css'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 4 + 1.5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setFading(true)
          setTimeout(onComplete, 800)
        }, 800)
      }
      setProgress(Math.min(p, 100))
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`loader ${fading ? 'loader--fade' : ''}`}>
      <div className="loader__background-model">
        <GLBViewer url="/loading.glb" scale={1.2} position={[0, -1, 0]} isFloat={true} preset="city" ambientIntensity={0.5} dirIntensity={1} />
      </div>
      
      <div className="loader__overlay"></div>

      <div className="loader__content">
        <div className="loader__name">AV</div>
        <div className="loader__text">
          <span className="loader__label">SYSTEM INITIALIZING</span>
          <span className="loader__percent">{Math.round(progress)}%</span>
        </div>
        <div className="loader__bar-track">
          <div className="loader__bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader__status">DEPLOYING NEURAL INTERFACE...</div>
      </div>
    </div>
  )
}
