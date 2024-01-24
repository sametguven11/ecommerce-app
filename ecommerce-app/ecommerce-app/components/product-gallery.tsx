"use client"
/**
 * Ürün galerisi bileşeni, ürün resimlerini gösterir ve seçili resmi büyük boyutta gösterir.
 */

import { useState } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"

interface Props {
  product: SanityProduct
}

export function ProductGallery({ product }: Props) {
  // Seçili resmin indeksini saklamak için state
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col-reverse">
      {/* Resim Grid */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <ul className="grid grid-cols-4 gap-6">
          {/* Resimlerin döngüsü */}
          {product.images.map((image, index) => (
            <div
              key={image._key as string}
              onClick={() => setSelectedImage(index)}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50"
            >
              {/* Resim */}
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <Image
                  src={urlForImage(image).url()}
                  width={200}
                  height={200}
                  alt=""
                  className="h-full w-full object-cover object-center"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(200, 200)
                  )}`}
                />
              </span>
              {/* Seçili resmin vurgulu kenarı */}
              {index === selectedImage && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-md ring-4 ring-indigo-500 ring-offset-2"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Ana Resim */}
      <div className="aspect-h-1 aspect-w-1 w-full">
        <Image
          priority
          src={urlForImage(product.images[selectedImage]).url()}
          alt={`Ana ${product.name} resmi`}
          width={600}
          height={750}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(600, 750))}`}
          className="h-full w-full border-2 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 sm:rounded-lg"
        />
      </div>
    </div>
  )
}
