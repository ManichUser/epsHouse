import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/ui/Header'
import { Card, CardImage, CardContent } from '@/components/ui/Card'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function QuartierBiensPage({ params }: PageProps) {
  const { id } = await params
  
  // Récupérer le quartier avec ses biens
  const quartier = await prisma.quartier.findUnique({
    where: { id },
    include: {
      bienImmobiliers: {
        include: {
          images: {
            orderBy: { isCover: 'desc' },
          },
          quartier: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!quartier) {
    notFound()
  }

  // Formater le prix en FCFA
  const formatPrice = (price: number) => {
    return `${(price / 1000).toFixed(0)}K FCFA`
  }

  // Traduire le type de bien
  const translateType = (type: string) => {
    const translations: Record<string, string> = {
      CHAMBRE: 'Chambre',
      STUDIO: 'Studio',
      APPARTEMENT: 'Appartement',
    }
    return translations[type] || type
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* En-tête avec retour */}
          <div className="py-6">
            <Link 
              href="/quartiers"
              className="inline-flex items-center text-gray-600 hover:text-[#5B8DD6] mb-4 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
              Retour
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {quartier.nom}
            </h1>
            <p className="text-gray-500 text-lg">
              {quartier.bienImmobiliers.length} {quartier.bienImmobiliers.length > 1 ? 'logements disponibles' : 'logement disponible'}
            </p>
          </div>

          {/* Grille de biens */}
          {quartier.bienImmobiliers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quartier.bienImmobiliers.map((bien) => {
                const coverImage = bien.images.find(img => img.isCover) || bien.images[0]
                
                return (
                  <Link 
                    key={bien.id} 
                    href={`/quartiers/${quartier.id}/biens/${bien.id}`}
                  >
                    <Card>
                      {/* Image */}
                      {coverImage && (
                        <div className="relative">
                          <CardImage 
                            src={coverImage.url} 
                            alt={bien.titre}
                            className="h-64"
                          />
                          {/* Badge type en overlay */}
                          <div className="absolute top-4 left-4">
                            <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full shadow-lg">
                              {translateType(bien.type)}
                            </span>
                          </div>
                          {/* Icône favori */}
                          <div className="absolute top-4 right-4">
                            <button className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                              <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-5">
                        {/* Titre */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                          {bien.titre}
                        </h3>
                        
                        {/* Localisation */}
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {quartier.nom}, Yaoundé
                        </div>
                        
                        {/* Prix */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-[#5B8DD6]">
                              {formatPrice(bien.prix)}
                            </p>
                            <p className="text-xs text-gray-400">par mois</p>
                          </div>
                          
                          {/* Note (placeholder) */}
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-5 h-5 text-yellow-400 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">4.8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Aucun logement disponible
              </h2>
              <p className="text-gray-500 mb-6">
                Il n&apos;y a pas encore de logements dans ce quartier.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}