import { useRef, useEffect } from 'react'

export default function RippleGrid({ color = 'rgba(108, 99, 255, 0.4)', dotSize = 2, spacing = 30 }) {
  const canvasRef = useRef(null)
  const ripplesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    let width, height, cols, rows
    
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      cols = Math.ceil(width / spacing)
      rows = Math.ceil(height / spacing)
    }
    
    resize()
    window.addEventListener('resize', resize)

    const onHover = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    
    const onClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.max(width, height),
        speed: 15,
        alpha: 1
      })
    }

    window.addEventListener('mousemove', onHover)
    window.addEventListener('click', onClick)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Update ripples
      ripplesRef.current.forEach(ripple => {
        ripple.radius += ripple.speed
        ripple.alpha -= 0.015
      })
      ripplesRef.current = ripplesRef.current.filter(r => r.alpha > 0)

      // Draw grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing
          const y = j * spacing
          
          // Hover effect
          const dx = x - mouseRef.current.x
          const dy = y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          let size = dotSize
          let currentDotColor = ctx.fillStyle
          
          // Mouse hover displacement
          if (dist < 100) {
            size = dotSize * (1 + (100 - dist) / 50)
            currentDotColor = color
          }
          
          // Ripple effect
          ripplesRef.current.forEach(ripple => {
            const rDx = x - ripple.x
            const rDy = y - ripple.y
            const rDist = Math.sqrt(rDx * rDx + rDy * rDy)
            
            // If dot is near the expanding ripple ring
            if (Math.abs(rDist - ripple.radius) < 30) {
              size = dotSize * (1 + (30 - Math.abs(rDist - ripple.radius)) / 10)
              currentDotColor = color
            }
          })

          ctx.fillStyle = currentDotColor
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)' // reset
        }
      }
      
      frameRef.current = requestAnimationFrame(draw)
    }
    
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onHover)
      window.removeEventListener('click', onClick)
    }
  }, [color, dotSize, spacing])

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.8
      }} 
    />
  )
}
