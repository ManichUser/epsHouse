'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const comments = [
  { id: 1, name: 'Thomas Karl', text: "J'ai trouvé mon logement très rapidement grâce à Epsilon House!" },
  { id: 2, name: 'Marie Dubois', text: "Excellent service, je recommande vivement." },
  { id: 3, name: 'Jean Nguema', text: "Interface simple et logements de qualité." },
  { id: 4, name: 'Sarah Johnson', text: "Très satisfaite de mon expérience." },
  { id: 5, name: 'Ahmed Hassan', text: "Processus rapide et efficace." },
  { id: 6, name: 'Claire Martin', text: "Parfait pour trouver un studio!" },
  { id: 7, name: 'Pierre Kamga', text: "Super plateforme, très utile." },
  { id: 8, name: 'Fatima Bello', text: "Je recommande à tous mes amis." },
]

export default function CommentsSection() {
  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('comments-section')
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setAnimation(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="comments-section" className="relative w-full mt-16 px-4 pb-20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Témoignages</h2>
          <button className="font-bold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-6 py-2 rounded-lg text-white transition-colors">
            Ajouter
          </button>
        </div>

        <div
          className={`w-full relative transition-all duration-1000 ${
            animation ? 'max-h-[800px] overflow-y-auto' : 'max-h-96 overflow-hidden'
          }`}
        >
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`transition-all duration-1000 rounded-b-xl w-full md:w-4/5 backdrop-blur-lg pt-2 pl-1 shadow-md bg-blue-700/10 ${
                  index % 2 === 0
                    ? `rounded-r-xl ${animation ? 'ml-0 md:ml-5' : 'ml-0'}`
                    : `rounded-l-xl ${animation ? 'ml-0 md:ml-16' : 'ml-0 md:ml-12'}`
                }`}
              >
                <div
                  className={`flex items-center rounded-b-xl p-4 bg-white ${
                    index % 2 === 0 ? 'rounded-r-xl' : 'rounded-l-xl'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/pp1.png"
                      width={48}
                      height={48}
                      alt="profil"
                      className={`rounded-full transition-all duration-1000 ${
                        animation ? 'opacity-100' : 'opacity-50'
                      }`}
                    />
                    <div>
                      <h3
                        className={`font-bold text-gray-900 transition-all duration-1000 ${
                          animation ? 'opacity-100' : 'opacity-30'
                        }`}
                      >
                        {comment.name}
                      </h3>
                      <p
                        className={`text-gray-600 text-sm transition-all duration-1000 ${
                          animation ? 'opacity-100' : 'opacity-30'
                        }`}
                      >
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!animation && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
        )}
      </div>
    </section>
  )
}