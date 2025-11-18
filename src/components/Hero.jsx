import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Spline from '@splinetool/react-spline'

// Helper: Golden gradient ring as SVG
function Ring({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF4C1" />
          <stop offset="35%" stopColor="#FFD46A" />
          <stop offset="65%" stopColor="#F6B93B" />
          <stop offset="100%" stopColor="#C98E1D" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="72" stroke="url(#goldGradient)" strokeWidth="24" />
    </svg>
  )
}

export default function Hero() {
  const rightRing = useAnimation()
  const leftRing = useAnimation()

  useEffect(() => {
    async function runSequence() {
      // Left ring idle bounce loop
      leftRing.start({
        y: [0, -10, 0],
        rotate: [0, -5, 0, 5, 0],
        transition: { repeat: Infinity, repeatType: 'loop', duration: 2.2, ease: 'easeInOut' },
      })

      // Right ring entrance from the right, elastic
      await rightRing.start({ x: [0, -200, -380], transition: { duration: 2, ease: [0.2, 0.8, 0.2, 1] } })

      // Pass through the logo letters with elastic jumps
      // We approximate positions over the curves of .nunta (n, u, n)
      await rightRing.start({
        x: [-380, -335, -300, -260, -220, -180],
        y: [0, -24, 0, -28, 0, -24],
        rotate: [0, -8, 0, -10, 0, -8],
        transition: { duration: 2.4, times: [0, 0.2, 0.38, 0.58, 0.8, 1], ease: 'easeInOut' },
      })

      // Clear the logo and meet the left ring on the far left
      await rightRing.start({ x: -520, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } })

      // Brief celebratory bounce for both rings
      leftRing.start({ y: [-6, 0], transition: { duration: 0.5, ease: 'easeOut' } })
      rightRing.start({ y: [-6, 0], transition: { duration: 0.5, ease: 'easeOut', delay: 0.05 } })
    }

    runSequence()
  }, [leftRing, rightRing])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Spline animated background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/5fQlL0qinzob1I8q/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient vignette overlay to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0)_0%,rgba(2,6,23,0.35)_55%,rgba(2,6,23,0.8)_100%)]"></div>

      <div className="relative z-10 flex items-center justify-center px-6 pt-28 pb-24">
        <div className="w-full max-w-6xl">
          {/* Title */}
          <div className="text-center mb-14">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_40px_rgba(255,255,255,0.15)]">
              .nunta
            </h1>
            <p className="mt-4 text-blue-100/80 text-base sm:text-lg">Weddings in motion — elastic, playful, and golden.</p>
          </div>

          {/* Stage */}
          <div className="relative mx-auto h-[340px] sm:h-[380px] md:h-[420px] max-w-4xl">
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/95 text-6xl sm:text-7xl md:text-8xl font-black tracking-tight select-none">.nunta</span>
            </div>

            {/* Left ring: idle bounce on the left */}
            <motion.div
              animate={leftRing}
              initial={{ x: -560, y: 0 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ filter: 'drop-shadow(0 12px 24px rgba(255, 191, 0, 0.25))' }}
            >
              <Ring className="w-28 h-28 sm:w-32 sm:h-32" />
            </motion.div>

            {/* Right ring: performs the path across the logo with elastic jumps */}
            <motion.div
              animate={rightRing}
              initial={{ x: 320, y: 0 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ filter: 'drop-shadow(0 14px 28px rgba(255, 200, 0, 0.35))' }}
            >
              <Ring className="w-28 h-28 sm:w-32 sm:h-32" />
            </motion.div>
          </div>

          {/* Subtext */}
          <div className="mt-10 text-center">
            <p className="text-blue-200/70 text-sm sm:text-base">Elastic interactions inspired by wedding bands — crafted for the .nunta TLD concept.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
