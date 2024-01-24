import { client } from "@/sanity/lib/client"

import { inventory } from "@/config/inventory"

/**
 * Sanity veritabanına ürün verisi ekleyen fonksiyon.
 */
export async function seedSanityData() {
  // Transaction oluştur
  const transaction = client.transaction()

  // Her ürün için veritabanına ekleme veya güncelleme yap
  inventory.forEach((item) => {
    const product = {
      _type: "product",
      _id: item.id,
      name: item.name,
      currency: item.currency,
      description: item.description,
      price: item.price,
      sku: item.sku,
      sizes: item.sizes,
      colors: item.colors,
      categories: item.categories,
    }

    // Ürünü veritabanına ekle veya güncelle
    transaction.createOrReplace(product)
  })

  // Transaction'ı tamamla
  await transaction.commit()

  // Resimleri eklemek için ayrı bir fonksiyonu çağır
  await seedSanityImages()

  // İşlem tamamlandığında bilgiyi console'a yaz
  console.log("Sanity data seeded")
}

/**
 * Ürünlerin resimlerini Sanity veritabanına ekleyen fonksiyon.
 */
async function seedSanityImages() {
  // Her ürün için işlem yap
  inventory.forEach(async (item) => {
    let images: any[] = []

    // Her resim için işlem yap
    for (const image of item.images) {
      // Resmi fetch et
      const imageAssetResponse = await fetch(image)
      const imageAssetBuffer = await imageAssetResponse.arrayBuffer()

      // Resmi veritabanına yükle
      const imageAsset = await client.assets.upload(
        "image",
        Buffer.from(imageAssetBuffer)
      )

      // Resmi referans olarak listeye ekle
      images.push({
        _key: imageAsset._id,
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      })
    }

    // Ürünün slug'ını oluştur ve veritabanında resimleri güncelle
    await client
      .patch(item.id)
      .set({ "slug.current": slugify(item.name), images })
      .commit()
  })
}

/**
 * Metni slug formatına dönüştüren yardımcı fonksiyon.
 */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}


