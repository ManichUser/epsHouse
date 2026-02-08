import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/ui/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { MapViewWrapper } from '@/components/features/MapViewWrapper'


export default async function QuartiersPage() {
  // Récupérer les quartiers avec le nombre de biens
  const quartiers = await prisma.quartier.findMany({
    include: {
      _count: {
        select: { bienImmobiliers: true },
      },
    },
    orderBy: {
      nom: 'asc',
    },
  })
  const biens = await prisma.bienImmobilier.findMany({
    include: {
      images: { where: { isCover: true } },
      quartier: true,
    },
  })
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Titre */}
          <div className="py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Choisissez votre quartier
            </h1>
            <p className="text-gray-500 text-lg">
              Yaoundé • {quartiers.length} quartiers disponibles
            </p>
          </div>
          <div className="w-full relative z-10">
        <MapViewWrapper biens={biens} />
      </div>
          {/* Grille de quartiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quartiers.map((quartier) => (
              <Link key={quartier.id} href={`/quartiers/${quartier.id}`}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-7 h-7 text-[#5B8DD6]"
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
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {quartier.nom}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {quartier._count.bienImmobiliers} {quartier._count.bienImmobiliers > 1 ? 'logements' : 'logement'}
                        </p>
                      </div>
                      
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                    
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Message si aucun quartier */}
          {quartiers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun quartier disponible pour le moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}