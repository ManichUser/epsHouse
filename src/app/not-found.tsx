import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4" style={{ color: '#5B8DD6' }}>
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button size="lg">
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  )
}