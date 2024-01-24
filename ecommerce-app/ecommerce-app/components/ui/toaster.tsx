"use client"

/**
 * Bu dosya, uygulamada görünen Toast (bildirim) bileşenlerini yöneten Toaster (tost makinesi) bileşenini içerir.
 * `@/components/ui/toast` ve `@/components/ui/use-toast` içindeki bileşen ve özel bir özel kancayı kullanarak tasarlanmıştır.
 * Toast'ların yönetimini sağlar ve uygulamanın genelinde bildirim gösterimi için kullanılır.
 */

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  // Toast'ları yönetmek ve kullanmak için özel bir kancayı kullanma
  const { toasts } = useToast()

  return (
    // Toast bileşenlerini sağlamak için ToastProvider kullanma
    <ToastProvider>
      {/* Toast'ların listesini haritalama ve her biri için gerekli bileşenleri oluşturma */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      {/* Toast'ların görünen alanını sağlamak için ToastViewport kullanma */}
      <ToastViewport />
    </ToastProvider>
  )
}

