"use client"
/**
 * Ürün filtrelerini içeren bileşen.
 */

import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

// Filtre seçeneklerini içeren veri yapısı
const filters = [
  {
    id: "category",
    name: "Marka",
    options: [
      { value: "rolex", label: "Rolex" },
      { value: "ap", label: "Audemars Piguet" },
      { value: "richard", label: "Richard Mille" },
      { value: "patek", label: "Patek Philippe" },
      { value: "breitling", label: "Breitling" },
    ],
  },
  {
    id: "size",
    name: "Beden",
    options: [
      { value: "xs", label: "X-Small" },
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
      { value: "xl", label: "X-Large" },
      { value: "one-size", label: "Tek Beden" },
    ],
  },
  {
    id: "color",
    name: "Renk",
    options: [
      { value: "siyah", label: "Siyah" },
      { value: "mavi", label: "Mavi" },
      { value: "kahverengi", label: "Kahverengi" },
      { value: "yeşil", label: "Yeşil" },
      { value: "beyaz", label: "Beyaz" },
    ],
  },
]

export function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValues = Array.from(searchParams.entries())

  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Kategoriler</h3>

      {/* Filtrelerin döngüsü */}
      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span>
                {section.name}{" "}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400">
                  {/* Seçili filtre sayısını gösterme */}
                  {searchParams.get(section.id) ? `(${searchParams.get(section.id)})` : "" }
                </span>
              </span>
            </AccordionTrigger>
            {/* Filtre seçeneklerinin içeriği */}
            <AccordionContent>
              <div className="space-y-4">
                {/* Seçeneklerin döngüsü */}
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    {/* Checkbox bileşeni */}
                    <Checkbox 
                      id={`filter-${section.id}-${optionIdx} `}
                      // Checkbox durumunu kontrol etme
                      checked={searchValues.some(
                        ([key, value]) => 
                          key === section.id && value === option.value 
                      )}
                      // Checkbox tıklama olayı
                      onClick={(event) => {
                        const params = new URLSearchParams(searchParams)
                        const checked = event.currentTarget.dataset.state === "checked"
                        
                        ? params.delete(section.id) 
                        : params.set(section.id, option.value)
                        router.replace(`\?${params.toString()}`)
                      }} 
                    />
                    {/* Seçenek etiketi */}
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx} `}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
