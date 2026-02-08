'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function SearchSection() {
//   const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuartier, setSelectedQuartier] = useState('')

  const quartiers = ['Bastos', 'Ngoa-Ekellé', 'Mvan', 'Essos', 'Odza', 'Emana']

  return (
    <section className="relative w-full mt-168 px-4 py-12 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recherchez votre logement
        </h2>

        {/* Formulaire de recherche */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quartier */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quartier
              </label>
              <select
                value={selectedQuartier}
                onChange={(e) => setSelectedQuartier(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les quartiers</option>
                {quartiers.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de bien
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tous les types</option>
                <option value="chambre">Chambre</option>
                <option value="studio">Studio</option>
                <option value="appartement">Appartement</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget max (FCFA)
              </label>
              <input
                type="number"
                placeholder="Ex: 150000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <Button className="w-full mt-6" size="lg">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Rechercher
          </Button>
        </div>

        {/* Google Maps */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127091.54447380125!2d11.437850754687498!3d3.8480325999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7a309fdf31%3A0x2b5a3c94c1699a7c!2sYaound%C3%A9!5e0!3m2!1sfr!2scm!4v1234567890123!5m2!1sfr!2scm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}