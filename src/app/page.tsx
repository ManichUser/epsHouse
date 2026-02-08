'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/ui/Header'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/quartiers?search=${searchTerm}`)
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section - Style RentCafe */}
        <section className="relative bg-linear-to-b from-gray-900 to-gray-800 pt-20">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Trouvez Votre Logement Idéal
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12">
                Rejoignez des milliers de locataires qui font confiance à Epsilon House pour trouver leur nouveau chez-eux.
              </p>

              {/* Barre de recherche */}
              <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
                <div className="bg-white rounded-full shadow-2xl flex items-center overflow-hidden">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Yaoundé, Bastos, Ngoa-Ekellé..."
                    className="flex-1 px-8 py-5 text-lg outline-none text-gray-900"
                  />
                  <button
                    type="submit"
                    className="bg-[#5B8DD6] hover:bg-[#4a7bc5] text-white px-10 py-5 font-semibold text-lg transition-colors"
                  >
                    Rechercher
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Image decorative */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-50 to-transparent"></div>
        </section>

        {/* Section Image Hero */}
        <section className="relative -mt-20">
          <div className="container mx-auto px-4">
            <div className="relative h-96 md:h-125 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/image.png"
                alt="Beautiful apartment interior"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Popular Apartments */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Logements Populaires à Yaoundé
            </h2>
            
            {/* Sera rempli avec les biens depuis l'API */}
            <div className="text-center">
              <Link 
                href="/quartiers"
                className="inline-block bg-[#5B8DD6] hover:bg-[#4a7bc5] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Voir tous les logements
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}