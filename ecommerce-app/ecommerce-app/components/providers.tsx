"use client"

/**
 * Tüm uygulama bileşenlerine sağlayıcıları eklemek için kullanılan bileşen.
 * Sepet, tema ve bildirim sağlayıcılarını içerir.
 */

import { CartProvider } from "use-shopping-cart"

import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

/**
 * Tüm uygulama bileşenlerine sağlayıcıları eklemek için kullanılan bileşen.
 * Sepet, tema ve bildirim sağlayıcılarını içerir.
 */
interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <CartProvider
      currency="USD"
      shouldPersist
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
    >
      {/* Tema ve bildirim sağlayıcıları */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        {children}
        <TailwindIndicator />
      </ThemeProvider>
    </CartProvider>
  )
}

