"use client"

/**
 * Tema sağlayıcısı bileşeni.
 * Next.js'in `next-themes` paketinden alınan `ThemeProvider`'ın kısaltılmış versiyonudur.
 */
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // NextThemesProvider'ı kullanarak temanın sağlanması.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
