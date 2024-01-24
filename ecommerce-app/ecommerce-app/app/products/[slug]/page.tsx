// Sanity veritabanından ürün bilgilerini çekmek için gerekli kütüphaneleri içe aktar
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

// Envanterdeki ürün bilgileri ve bileşenleri içe aktar
import { SanityProduct } from "@/config/inventory"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"

// Sayfa parametreleri için arayüz
interface Props {
  params: {
    slug: string
  }
}

// Sayfa bileşeni
export default async function Page({ params }: Props) {
  // Veritabanından belirtilen ürünü çek
  const product = await client.fetch<SanityProduct>(
    groq`*[_type == "product" && slug.current == "${params.slug}"][0]{
      _id,
      _createdAt,
      "id": _id,
      name,
      sku,
      images,
      price,
      currency,
      description,
      sizes,
      categories,
      colors,
      "slug": slug.current
    }`
  )

  // Ürün bilgisini konsola yazdır
  console.log(product)

  // Sayfa içeriği
  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Ürün içeriği */}
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Ürün galerisi */}
          <ProductGallery product={product} />
          
          {/* Ürün bilgileri */}
          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  )
}
