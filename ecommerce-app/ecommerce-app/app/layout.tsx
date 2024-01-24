import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { SiteBlob } from "@/components/site-blob"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

// Metadata nesnesi için varsayılan bilgileri belirle
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
   icon: 'favicon.ico'
  }
};

// RootLayout bileşeni için Props türünü tanımla
interface RootLayoutProps {
  children: React.ReactNode;
}

// RootLayout bileşeni
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {/* HTML etiketi ve dil özelliği */}
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {/* Sağlayıcı bileşenlerini içeren üst düzey bileşen */}
          <Providers>
            {/* Ana bileşen yapısı */}
            <div className="relative flex min-h-screen flex-col">
              {/* Site başlığı ve navigasyon */}
              <SiteHeader />
              {/* Site arka planı */}
              <SiteBlob />
              {/* Ana içerik alanı */}
              <div className="flex-1">{children}</div>
              {/* Site altbilgi */}
              <SiteFooter />
            </div>
          </Providers>
        </body>
      </html>
    </>
  )
}
