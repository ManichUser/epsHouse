import { PrismaClient, TypeBien } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seed...')

  // Nettoyer la base de données
  await prisma.imageBien.deleteMany()
  await prisma.bienImmobilier.deleteMany()
  await prisma.zone.deleteMany()
  await prisma.quartier.deleteMany()
  await prisma.ville.deleteMany()

  console.log('✅ Base de données nettoyée')

  // ========================================
  // 1. CRÉER LA VILLE : YAOUNDÉ
  // ========================================
  const yaounde = await prisma.ville.create({
    data: {
      nom: 'Yaoundé',
    },
  })
  console.log('✅ Ville créée: Yaoundé')

  // ========================================
  // 2. CRÉER LES QUARTIERS DE YAOUNDÉ
  // ========================================
  const quartiers = await Promise.all([
    prisma.quartier.create({
      data: {
        nom: 'Ngoa-Ekellé',
        villeId: yaounde.id,
      },
    }),
    prisma.quartier.create({
      data: {
        nom: 'Bastos',
        villeId: yaounde.id,
      },
    }),
    prisma.quartier.create({
      data: {
        nom: 'Mvan',
        villeId: yaounde.id,
      },
    }),
    prisma.quartier.create({
      data: {
        nom: 'Essos',
        villeId: yaounde.id,
      },
    }),
    prisma.quartier.create({
      data: {
        nom: 'Odza',
        villeId: yaounde.id,
      },
    }),
    prisma.quartier.create({
      data: {
        nom: 'Emana',
        villeId: yaounde.id,
      },
    }),
  ])
  console.log(`✅ ${quartiers.length} quartiers créés`)

  // ========================================
  // 3. CRÉER DES ZONES (optionnel)
  // ========================================
  const zonesNgoaEkelle = await Promise.all([
    prisma.zone.create({
      data: {
        nom: 'Carrefour Jouvence',
        quartierId: quartiers[0].id,
      },
    }),
    prisma.zone.create({
      data: {
        nom: 'Rond-point Nlongkak',
        quartierId: quartiers[0].id,
      },
    }),
  ])
  console.log('✅ Zones créées pour Ngoa-Ekellé')

  // ========================================
  // 4. CRÉER LES BIENS IMMOBILIERS
  // ========================================
  
  // NGOA-EKELLÉ
  const bien1 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Studio moderne proche Jouvence',
      type: TypeBien.STUDIO,
      prix: 75000,
      description: 'Studio tout équipé, meublé avec cuisine américaine. Eau et électricité disponibles 24h/24. Quartier calme et sécurisé.',
      quartierId: quartiers[0].id,
      zoneId: zonesNgoaEkelle[0].id,
    },
  })

  const bien2 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Chambre spacieuse Nlongkak',
      type: TypeBien.CHAMBRE,
      prix: 40000,
      description: 'Chambre dans une villa partagée, salle de bain commune. Proche des transports, marché à proximité.',
      quartierId: quartiers[0].id,
      zoneId: zonesNgoaEkelle[1].id,
    },
  })

  const bien3 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Appartement 2 chambres Ngoa-Ekellé',
      type: TypeBien.APPARTEMENT,
      prix: 150000,
      description: 'Bel appartement de 2 chambres avec salon, cuisine équipée. Immeuble moderne avec parking. Idéal pour famille.',
      quartierId: quartiers[0].id,
    },
  })

  // BASTOS
  const bien4 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Appartement standing Bastos',
      type: TypeBien.APPARTEMENT,
      prix: 350000,
      description: 'Appartement haut standing 3 chambres, climatisation, eau chaude, internet fibre. Résidence sécurisée avec gardien.',
      quartierId: quartiers[1].id,
    },
  })

  const bien5 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Studio luxueux Bastos',
      type: TypeBien.STUDIO,
      prix: 180000,
      description: 'Studio luxueux meublé, quartier diplomatique. Proche ambassades et restaurants. Parking privé inclus.',
      quartierId: quartiers[1].id,
    },
  })

  // MVAN
  const bien6 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Chambre étudiante Mvan',
      type: TypeBien.CHAMBRE,
      prix: 35000,
      description: 'Chambre simple pour étudiant, proche de l\'université. Environnement calme pour études.',
      quartierId: quartiers[2].id,
    },
  })

  const bien7 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Appartement 3 chambres Mvan',
      type: TypeBien.APPARTEMENT,
      prix: 120000,
      description: 'Grand appartement familial, 3 chambres, 2 salles de bain. Balcon avec vue dégagée. Quartier animé.',
      quartierId: quartiers[2].id,
    },
  })

  // ESSOS
  const bien8 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Studio neuf Essos',
      type: TypeBien.STUDIO,
      prix: 60000,
      description: 'Studio récemment rénové, carrelage neuf. Cuisine équipée, toilette interne. Proche du marché central.',
      quartierId: quartiers[3].id,
    },
  })

  const bien9 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Chambre indépendante Essos',
      type: TypeBien.CHAMBRE,
      prix: 45000,
      description: 'Chambre avec entrée indépendante, douche interne. Idéal pour jeune professionnel. Accès moto-taxi facile.',
      quartierId: quartiers[3].id,
    },
  })

  const bien10 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Appartement 2 chambres Essos',
      type: TypeBien.APPARTEMENT,
      prix: 100000,
      description: 'Appartement lumineux, 2 chambres avec placards. Salon spacieux, cuisine avec coin repas. Eau CAMWATER.',
      quartierId: quartiers[3].id,
    },
  })

  // ODZA
  const bien11 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Chambre simple Odza',
      type: TypeBien.CHAMBRE,
      prix: 30000,
      description: 'Chambre économique, propre et sécurisée. Parfait pour budget serré. Quartier populaire bien desservi.',
      quartierId: quartiers[4].id,
    },
  })

  const bien12 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Studio tout équipé Odza',
      type: TypeBien.STUDIO,
      prix: 55000,
      description: 'Studio compact avec tout le confort: lit, armoire, table. Eau et électricité stables. Proche des commerces.',
      quartierId: quartiers[4].id,
    },
  })

  // EMANA
  const bien13 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Appartement 4 chambres Emana',
      type: TypeBien.APPARTEMENT,
      prix: 200000,
      description: 'Grande villa transformée en appartement, 4 chambres. Jardin privatif, parking multiple. Idéal grande famille.',
      quartierId: quartiers[5].id,
    },
  })

  const bien14 = await prisma.bienImmobilier.create({
    data: {
      titre: 'Chambre avec balcon Emana',
      type: TypeBien.CHAMBRE,
      prix: 38000,
      description: 'Chambre spacieuse avec petit balcon, vue sur verdure. Calme et aéré. Parfait pour repos.',
      quartierId: quartiers[5].id,
    },
  })

  const biens = [bien1, bien2, bien3, bien4, bien5, bien6, bien7, bien8, bien9, bien10, bien11, bien12, bien13, bien14]
  console.log(`✅ ${biens.length} biens immobiliers créés`)

  // ========================================
  // 5. AJOUTER DES IMAGES (PLACEHOLDER)
  // ========================================
  // Note: Ces URLs seront remplacées par de vraies images Cloudinary
  const placeholderImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
  ]

  for (const bien of biens) {
    // Ajouter 2-4 images par bien
    const numImages = Math.floor(Math.random() * 3) + 2
    for (let i = 0; i < numImages; i++) {
      const imageUrl = placeholderImages[Math.floor(Math.random() * placeholderImages.length)]
      await prisma.imageBien.create({
        data: {
          url: imageUrl,
          publicId: `placeholder_${bien.id}_${i}`,
          isCover: i === 0, // Première image = cover
          bienId: bien.id,
        },
      })
    }
  }
  console.log('✅ Images placeholder créées')

  console.log('🎉 Seed terminé avec succès!')
  console.log(`
📊 RÉSUMÉ:
  - 1 Ville (Yaoundé)
  - ${quartiers.length} Quartiers
  - 2 Zones
  - ${biens.length} Biens immobiliers
  - ~${biens.length * 3} Images
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erreur lors du seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
