"use client"

/**
 * Ürünleri sıralamak ve filtrelemek için kullanılan bileşen.
 * Ayrıca mobil cihazlarda filtreleme panelini açmak için bir buton içerir.
 */

import { useRouter } from "next/navigation"
import { Filter } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ProductFilters } from "@/components/product-filters"

// Sıralama seçenekleri
const sortOptions = [
  { name: "En yeni", value: "/?date=desc" },
  { name: "Fiyat, düşükten yükseğe", value: "/?price=asc" },
  { name: "Fiyat, yüksekten düşüğe", value: "/?price=desc" },
]

/**
 * Ürünleri sıralamak ve filtrelemek için kullanılan bileşen.
 */
export function ProductSort() {
  // Next.js router'ı
  const router = useRouter()

  return (
    <div className="flex items-center">
      {/* Sıralama seçeneği */}
      <Select onValueChange={(value) => router.replace(value)}>
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Göre Sırala" />
        </SelectTrigger>
        {/* Sıralama seçenekleri */}
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.name} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Mobil cihazlarda filtreleme panelini açmak için buton */}
      <Sheet>
        <SheetContent className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Kategoriler</SheetTitle>
            <SheetDescription>
              Aşağıdaki seçenekleri kullanarak ürün aramanızı daraltın.
            </SheetDescription>
          </SheetHeader>
          {/* Filtreleme bileşeni */}
          <ProductFilters />
        </SheetContent>
        <SheetTrigger className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
          <span className="sr-only">Filters</span>
          <Filter className="h-5 w-5" aria-hidden="true" />
        </SheetTrigger>
      </Sheet>
    </div>
  )
}

