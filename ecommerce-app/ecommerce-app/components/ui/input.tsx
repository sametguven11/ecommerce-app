/**
 * Bu dosya, özelleştirilebilir bir `Input` bileşenini içerir.
 * Temel bir giriş alanı stilini içerir ve işaretlenmiş durum, boyut gibi özelliklere sahiptir.
 * `react` ve `@lib/utils` kütüphaneleri kullanılarak oluşturulmuştur.
 * Detaylı bilgi için: https://reactjs.org/docs/dom-elements.html#input
 */

import * as React from "react"

import { cn } from "@/lib/utils"

// Input bileşeni
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
