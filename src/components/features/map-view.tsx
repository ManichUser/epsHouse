'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Bien {
  id: string
  latitude: number
  longitude: number
  titre: string
}

export function MapView({ biens }: { biens: Bien[] }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialiser la carte
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([3.848, 11.5021], 13)

      // Ajouter les tiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map.current)
    }

    // Nettoyer les anciens markers
    if (map.current) {
      map.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.current!.removeLayer(layer)
        }
      })

      // Ajouter les nouveaux markers
      biens.forEach((bien) => {
        L.marker([bien.latitude, bien.longitude])
          .bindPopup(bien.titre)
          .addTo(map.current!)
      })
    }
  }, [biens])

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '500px',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    />
  )
}