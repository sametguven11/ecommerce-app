"use client"
/**
 * Tema değiştirme düğmesi bileşeni.
 * Kullanıcıya tema değiştirme imkanı sunan bir düğme.
 */

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ThemeToggle() {
  // Tema bilgilerini alma
  const { setTheme, theme } = useTheme()

  return (
    // Tema değiştirme düğmesi
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
