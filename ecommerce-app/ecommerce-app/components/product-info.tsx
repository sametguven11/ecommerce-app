"use client"
/**
 * Ürün bilgi bileşeni, belirtilen ürünün adı, fiyatı, açıklaması ve sepete ekleme işlemlerini gösterir.
 */

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
}

export function ProductInfo({ product }: Props) {
  // Seçili bedeni tutan state
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  // Sepet işlemleri için useShoppingCart hook'u
  const { addItem, incrementItem, cartDetails } = useShoppingCart()
  // Toast bildirimleri için useToast hook'u
  const { toast } = useToast()
  // Ürünün sepete eklenip eklenmediğini kontrol et
  const isInCart = !!cartDetails?.[product._id]

  // Sepete ekleme fonksiyonu
  function addToCart() {
    // Eklenen ürün bilgilerini içeren obje
    const item = {
      ...product,
      product_data: {
        size: selectedSize,
      },
    }
    // Ürün sepette varsa miktarını arttır, yoksa yeni eklenen ürünü ekle
    isInCart ? incrementItem(item._id) : addItem(item)
    // Bildirim göster
    toast({
      title: `${item.name} (${getSizeName(selectedSize)})`,
      description: "Sepete eklenen ürün",
      action: (
        // "Sepeti aç" butonu, kullanıcıyı sepet sayfasına yönlendirir
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Sepeti aç</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    })
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      {/* Ürün adı */}
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        {/* Ürün fiyatı */}
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">{formatCurrencyString({ value: product.price, currency: product.currency })}</p>
      </div>

      <div className="mt-6">
        {/* Ürün açıklaması */}
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        {/* Beden seçimi */}
        <p>
          Beden: <strong>{getSizeName(selectedSize)}</strong>
        </p>
        {/* Beden seçenekleri */}
        {product.sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      {/* Sepete ekleme formu */}
      <form className="mt-6">
        <div className="mt-4 flex">
          {/* Sepete ekleme butonu */}
          <Button
            type="button"
            onClick={addToCart}
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Sepete Ekle
          </Button>
        </div>
      </form>
    </div>
  )
}
