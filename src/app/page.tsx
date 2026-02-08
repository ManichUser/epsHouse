import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Contenu */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <h1 className="text-6xl md:text-8xl font-serif mb-6" style={{ color: '#5B8DD6' }}>
            Epsilon House
          </h1>
          
          {/* Slogan */}
          <div className="inline-block bg-[#5B8DD6] px-10 py-4 rounded-xl mb-8 shadow-lg">
            <p className="text-white text-xl md:text-2xl font-light">
              Trouver un logement devient facile
            </p>
          </div>
        
          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Découvrez facilement des chambres, studios et appartements <br className="hidden md:block" />
            dans tous les quartiers de Yaoundé
          </p>
          
          {/* CTA Button */}
          <Link href="/quartiers">
            <Button size="lg" className="shadow-xl shadow-[#5B8DD6]/30 text-lg px-12 py-6 rounded-full">
              Explorer les quartiers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}