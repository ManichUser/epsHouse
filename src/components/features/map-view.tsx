// src/components/features/map-view.tsx
'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Bien {
  id: string
  latitude: number
  longitude: number
  titre: string
  prix?: number
}

export function MapView({ biens }: { biens: Bien[] }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || !biens.length) return

    // Initialiser la carte
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([3.848, 11.5021], 13)

      // Ajouter les tiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map.current)

      // ✅ FIX: Définir l'icône par défaut avec URLs CDN
      const DefaultIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      L.Marker.prototype.setIcon(DefaultIcon)
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
        const popupContent = `
          <div class="text-sm font-semibold">${bien.titre}</div>
          ${bien.prix ? `<div class="text-xs text-gray-600">${bien.prix.toLocaleString()} FCFA</div>` : ''}
        `

        L.marker([bien.latitude, bien.longitude])
          .bindPopup(popupContent)
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
        zIndex: 1,
      }}
    />
  )
}