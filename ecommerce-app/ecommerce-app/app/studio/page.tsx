 "use client"


// Next.js ve next-sanity/studio modülünü içe aktar
import { NextStudio } from "next-sanity/studio"

// Sanity konfigürasyonunu içe aktar
import config from "../../sanity.config"

// Stüdyo sayfası bileşeni
export default function StudioPage() {
  return <NextStudio config={config} />
}
