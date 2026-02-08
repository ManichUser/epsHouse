import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
  onMenuClick: () => void
}

export default function Hero({ onMenuClick }: HeroProps) {
  return (
    <section className="relative h-auto w-full pt-2">
      {/* Bouton menu burger */}
      <button
        onClick={onMenuClick}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        <svg className="w-6 h-6 text-gray-900" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Image de fond */}
      <div className="relative w-full h-screen">
        <Image 
          src="/hero.jpeg" 
          alt="hero" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Texte overlay */}
      <h1 className="absolute top-40 left-0 right-0 text-white font-bold text-4xl m-5">
        Trouvez votre <span className="text-blue-500">Logement</span> facilement.
      </h1>

      {/* Card featured property */}
      <div className="absolute top-48 left-3 right-3 rounded-xl flex p-2 justify-center bg-white h-80 shadow-2xl">
        <div className="relative w-full h-full">
          <Image 
            src="/img1.png" 
            alt="logement"
            fill
            className="object-cover rounded-xl"
          />
          
          <div className="absolute bg-black/30 bottom-2 left-0 right-0 rounded-b-xl shadow-sm p-4 h-1/2">
            <div className="flex justify-between items-center">
              <p className="text-lg text-blue-400 font-bold">
                280,000 <span className="text-blue-400">FCFA</span>
              </p>
              <div className="flex items-center gap-2">
                <Image src="/check.png" width={12} height={12} alt="étoile" />
                <span className="font-bold text-yellow-400">4.5</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">Résidence Hilton</h2>

            <div className="flex gap-2 items-center">
              <Image src="/check.png" width={16} height={12} alt="icon" />
              <span className="text-slate-200">Yaoundé, Bastos</span>
            </div>

            <div className="flex m-2 items-center gap-1">
              {[...Array(7)].map((_, i) => (
                <Image key={i} src="/Line1.png" width={4} height={4} alt="line" />
              ))}
            </div>

            <div className="flex w-full mt-2 justify-between px-6">
              <div className="flex gap-1 items-center">
                <Image src="/check.png" width={16} height={12} alt="icon" />
                <span className="text-slate-200 text-sm">3 Chambres</span>
              </div>
              <div className="flex gap-1 items-center">
                <Image src="/check.png" width={16} height={12} alt="icon" />
                <span className="text-slate-200 text-sm">2 Salles de bain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination et lien */}
      <div className="absolute top-[40rem] left-0 right-0 flex justify-between items-center px-3 h-18">
        <div className="flex justify-center gap-2 p-3">
          <div className="h-1 w-6 bg-white"></div>
          <div className="h-1 w-6 bg-white"></div>
          <div className="h-1 w-16 bg-blue-500"></div>
        </div>

        <Link 
          href="/quartiers" 
          className="text-blue-500 text-sm flex gap-2 items-center active:scale-110 transition-transform"
        >
          <span>Voir tous les logements</span>
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  )
}