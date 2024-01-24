/**
 * Ana gezinme çubuğunu oluşturan bileşen.
 */

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      {/* Ana sayfa linki */}
      <Link href="/" className="flex items-center space-x-2">
        {/* Site logosu */}
        <Icons.logo className="h-7 w-7" />
        {/* Site adı */}
        <span className="inline-block text-xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
