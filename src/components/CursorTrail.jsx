import { useEffect, useRef } from 'react'
import './CursorTrail.css'

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const trailRef = useRef([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 4 + 2,
        hue: Math.random() > 0.5 ? 252 : 199, // purple or cyan
      })
      // Keep trail short for performance
      if (trailRef.current.length > 80) {
        trailRef.current.shift()
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      trailRef.current = trailRef.current.filter(p => p.life > 0)
      trailRef.current.forEach((p, i) => {
        p.life -= 0.025
        p.size *= 0.97
        const alpha = p.life * 0.7
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        grd.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${alpha})`)
        grd.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })

      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" />
}
