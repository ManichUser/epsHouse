import { PrismaClient, TypeBien } from '@prisma/client'

const prisma = new PrismaClient()

// Coordonnées GPS réelles de Yaoundé et ses quartiers
const YAOUNDE_COORDS = { lat: 3.848, lng: 11.5021 }

const QUARTIERS_COORDS = {
  'Ngoa-Ekellé': { lat: 3.8656, lng: 11.5244 },
  'Bastos': { lat: 3.8753, lng: 11.4983 },
  'Mvan': { lat: 3.8405, lng: 11.4893 },
  'Essos': { lat: 3.8625, lng: 11.5156 },
  'Odza': { lat: 3.8234, lng: 11.5467 },
  'Emana': { lat: 3.8012, lng: 11.4756 },
}

async function main() {
  console.log('🌱 Début du seed avec GPS...')

  try {
    // Nettoyer la base de données
    console.log('🗑️  Nettoyage des données existantes...')
    await prisma.imageBien.deleteMany().catch(() => {})
    await prisma.bienImmobilier.deleteMany().catch(() => {})
    await prisma.zone.deleteMany().catch(() => {})
    await prisma.quartier.deleteMany().catch(() => {})
    await prisma.ville.deleteMany().catch(() => {})

    console.log('✅ Base de données nettoyée')

    // CRÉER LA VILLE : YAOUNDÉ
    const yaounde = await prisma.ville.create({
      data: {
        nom: 'Yaoundé',
        latitude: YAOUNDE_COORDS.lat,
        longitude: YAOUNDE_COORDS.lng,
      },
    })
    console.log('✅ Ville créée: Yaoundé')

    // CRÉER LES QUARTIERS
    const quartiers = await Promise.all(
      Object.entries(QUARTIERS_COORDS).map(([nom, coords]) =>
        prisma.quartier.create({
          data: {
            nom,
            villeId: yaounde.id,
            latitude: coords.lat,
            longitude: coords.lng,
          },
        })
      )
    )
    console.log(`✅ ${quartiers.length} quartiers créés`)

    // CRÉER DES ZONES pour Ngoa-Ekellé
    const zonesNgoaEkelle = await Promise.all([
      prisma.zone.create({
        data: {
          nom: 'Carrefour Jouvence',
          quartierId: quartiers[0].id,
          latitude: 3.8670,
          longitude: 11.5250,
        },
      }),
      prisma.zone.create({
        data: {
          nom: 'Rond-point Nlongkak',
          quartierId: quartiers[0].id,
          latitude: 3.8642,
          longitude: 11.5238,
        },
      }),
    ])

    // CRÉER LES BIENS avec positions GPS
    const biens = []

    // Helper pour générer position aléatoire autour d'un point
    const randomOffset = () => (Math.random() - 0.5) * 0.01

    // NGOA-EKELLÉ
    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Studio moderne proche Jouvence',
          type: TypeBien.STUDIO,
          prix: 75000,
          description:
            'Studio tout équipé, meublé avec cuisine américaine. Eau et électricité 24h/24. Quartier calme et sécurisé.',
          superficie: 25,
          nombreChambres: 1,
          nombreSallesBain: 1,
          meuble: true,
          latitude: QUARTIERS_COORDS['Ngoa-Ekellé'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Ngoa-Ekellé'].lng + randomOffset(),
          adresse: 'Avenue Jouvence, Ngoa-Ekellé, Yaoundé',
          quartierId: quartiers[0].id,
          zoneId: zonesNgoaEkelle[0].id,
          disponible: true,
        },
      })
    )

    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Chambre spacieuse Nlongkak',
          type: TypeBien.CHAMBRE,
          prix: 40000,
          description: 'Chambre dans villa partagée, salle de bain commune. Proche transports.',
          superficie: 15,
          nombreChambres: 1,
          nombreSallesBain: 1,
          meuble: false,
          latitude: QUARTIERS_COORDS['Ngoa-Ekellé'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Ngoa-Ekellé'].lng + randomOffset(),
          adresse: 'Rond-point Nlongkak, Ngoa-Ekellé, Yaoundé',
          quartierId: quartiers[0].id,
          zoneId: zonesNgoaEkelle[1].id,
          disponible: true,
        },
      })
    )

    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Appartement 2 chambres Ngoa-Ekellé',
          type: TypeBien.APPARTEMENT,
          prix: 150000,
          description: 'Bel appartement avec salon, cuisine équipée. Immeuble moderne avec parking.',
          superficie: 65,
          nombreChambres: 2,
          nombreSallesBain: 1,
          meuble: false,
          latitude: QUARTIERS_COORDS['Ngoa-Ekellé'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Ngoa-Ekellé'].lng + randomOffset(),
          adresse: 'Ngoa-Ekellé, Yaoundé',
          quartierId: quartiers[0].id,
          disponible: true,
        },
      })
    )

    // BASTOS
    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Appartement standing Bastos',
          type: TypeBien.APPARTEMENT,
          prix: 350000,
          description:
            'Appartement haut standing 3 chambres, climatisation, eau chaude, internet fibre.',
          superficie: 120,
          nombreChambres: 3,
          nombreSallesBain: 2,
          meuble: true,
          latitude: QUARTIERS_COORDS['Bastos'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Bastos'].lng + randomOffset(),
          adresse: 'Avenue des Ambassades, Bastos, Yaoundé',
          quartierId: quartiers[1].id,
          disponible: true,
        },
      })
    )

    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Studio luxueux Bastos',
          type: TypeBien.STUDIO,
          prix: 180000,
          description: 'Studio luxueux meublé, quartier diplomatique. Parking privé inclus.',
          superficie: 35,
          nombreChambres: 1,
          nombreSallesBain: 1,
          meuble: true,
          latitude: QUARTIERS_COORDS['Bastos'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Bastos'].lng + randomOffset(),
          adresse: 'Bastos, Yaoundé',
          quartierId: quartiers[1].id,
          disponible: true,
        },
      })
    )

    // MVAN
    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Chambre étudiante Mvan',
          type: TypeBien.CHAMBRE,
          prix: 35000,
          description: "Chambre simple pour étudiant, proche de l'université.",
          superficie: 12,
          nombreChambres: 1,
          nombreSallesBain: 1,
          meuble: true,
          latitude: QUARTIERS_COORDS['Mvan'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Mvan'].lng + randomOffset(),
          adresse: 'Mvan, Yaoundé',
          quartierId: quartiers[2].id,
          disponible: true,
        },
      })
    )

    // ESSOS
    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Studio neuf Essos',
          type: TypeBien.STUDIO,
          prix: 60000,
          description: 'Studio récemment rénové, carrelage neuf. Cuisine équipée.',
          superficie: 28,
          nombreChambres: 1,
          nombreSallesBain: 1,
          meuble: false,
          latitude: QUARTIERS_COORDS['Essos'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Essos'].lng + randomOffset(),
          adresse: 'Essos, Yaoundé',
          quartierId: quartiers[3].id,
          disponible: true,
        },
      })
    )

    // ODZA
    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Chambre simple Odza',
          type: TypeBien.CHAMBRE,
          prix: 30000,
          description: 'Chambre économique, propre et sécurisée.',
          superficie: 10,
          nombreChambres: 1,
          nombreSallesBain: 1,
          meuble: false,
          latitude: QUARTIERS_COORDS['Odza'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Odza'].lng + randomOffset(),
          adresse: 'Odza, Yaoundé',
          quartierId: quartiers[4].id,
          disponible: true,
        },
      })
    )

    // EMANA
    biens.push(
      await prisma.bienImmobilier.create({
        data: {
          titre: 'Appartement 4 chambres Emana',
          type: TypeBien.APPARTEMENT,
          prix: 200000,
          description: 'Grande villa transformée en appartement, 4 chambres. Jardin privatif.',
          superficie: 150,
          nombreChambres: 4,
          nombreSallesBain: 2,
          meuble: false,
          latitude: QUARTIERS_COORDS['Emana'].lat + randomOffset(),
          longitude: QUARTIERS_COORDS['Emana'].lng + randomOffset(),
          adresse: 'Emana, Yaoundé',
          quartierId: quartiers[5].id,
          disponible: true,
        },
      })
    )

    console.log(`✅ ${biens.length} biens immobiliers créés`)

    // AJOUTER DES IMAGES
    const placeholderImages = [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    ]

    for (const bien of biens) {
      const numImages = Math.floor(Math.random() * 3) + 2
      for (let i = 0; i < numImages; i++) {
        const imageUrl = placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
        await prisma.imageBien.create({
          data: {
            url: imageUrl,
            publicId: `placeholder_${bien.id}_${i}`,
            isCover: i === 0,
            ordre: i,
            bienId: bien.id,
          },
        })
      }
    }

    console.log('✅ Images placeholder créées')
    console.log('🎉 Seed terminé avec succès!')
    console.log(`
📊 RÉSUMÉ:
  - 1 Ville (Yaoundé) avec GPS ✅
  - ${quartiers.length} Quartiers avec GPS ✅
  - 2 Zones avec GPS ✅
  - ${biens.length} Biens immobiliers avec GPS ✅
  - ~${biens.length * 3} Images ✅
    `)
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })