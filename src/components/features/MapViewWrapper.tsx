'use client'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('./map-view').then((mod) => mod.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg" />
  ),
})

interface Bien {
  id: string
  latitude: number
  longitude: number
  titre: string
  prix?: number
}

export function MapViewWrapper({ biens }: { biens: Bien[] }) {
  return <MapView biens={biens} />
}