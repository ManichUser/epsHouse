'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function WhySection() {
  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('why-section')
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setAnimation(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="why-section" className="relative w-full mt-16 text-white">
      <div className="relative">
        <Image
          src="/img6.png"
          alt="background"
          width={1920}
          height={400}
          className="h-96 w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-blue-600/80 to-blue-800/80">
          <h1 className="text-4xl w-full px-8 md:px-20 pt-12 pb-4 font-bold">
            Pourquoi choisir Epsilon House ?
          </h1>

          <div className="mt-12 pl-8 md:pl-48 space-y-6 font-bold text-2xl">
            <div className="flex items-center gap-4">
              <Image
                src="/check.png"
                width={32}
                height={32}
                alt="check"
                className={`transition-all duration-1000 ${
                  animation ? 'opacity-100' : 'opacity-10'
                }`}
              />
              <span
                className={`transition-all duration-1000 ${
                  animation ? 'opacity-100 ml-0' : 'opacity-50 ml-16'
                }`}
              >
                Rapide
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/check.png"
                width={32}
                height={32}
                alt="check"
                className={`transition-all duration-1000 ${
                  animation ? 'opacity-100' : 'opacity-10'
                }`}
              />
              <span
                className={`transition-all duration-1000 ${
                  animation ? 'opacity-100 ml-0' : 'opacity-50 ml-16'
                }`}
              >
                Sûr
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/check.png"
                width={32}
                height={32}
                alt="check"
                className={`transition-all duration-1000 ${
                  animation ? 'opacity-100' : 'opacity-10'
                }`}
              />
              <span
                className={`transition-all duration-1000 ${
                  animation ? 'opacity-100 ml-0' : 'opacity-50 ml-16'
                }`}
              >
                Efficace
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 bg-black/50 w-80 h-96 rounded-l-xl shadow-xl hidden md:block"></div>
      </div>
    </section>
  )
}