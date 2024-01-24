import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind ve başka CSS sınıflarını birleştiren fonksiyon.
 * @param inputs - Bir veya daha fazla sınıf değeri.
 * @returns Birleştirilmiş sınıf değeri.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Verilen beden değerini okunabilir bir forma dönüştüren fonksiyon.
 * @param value - Beden değeri.
 * @returns Okunabilir beden adı.
 */
export function getSizeName(value: string) {
  switch (value) {
    case "xs":
      return "X-Small"
    case "s":
      return "Small"
    case "m":
      return "Medium"
    case "l":
      return "Large"
    case "xl":
      return "X-Large"
    case "one-size":
      return "Tek Beden"
  }
}


