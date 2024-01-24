"use client"
/**
 * Bu bileşen, ödeme oturumu sonucunu gösterir.
 * Eğer ödeme oturumu başarılıysa, müşteri bilgilerini ve teşekkür mesajını içerir.
 * Ayrıca, ödeme oturumu bulunamazsa bir hata mesajı gösterir.
 *
 * @param {Props} Props - Müşteri detayları
 */

import { useEffect } from "react"
import { CheckCheck, XCircle } from "lucide-react"
import Stripe from "stripe"
import { useShoppingCart } from "use-shopping-cart"

interface Props {
  customerDetails: Stripe.Checkout.Session.CustomerDetails | null
}

export function CheckoutSession({ customerDetails }: Props) {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    if (customerDetails) {
      clearCart()
    }
  }, [customerDetails])

  if (!customerDetails) {
    return (
      <>
        <XCircle className="mx-auto h-10 w-10 text-red-400" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-400 sm:text-5xl">
          Ödeme oturumu bulunamadı
        </h1>
      </>
    )
  }

  return (
    <>
      <CheckCheck className="mx-auto h-10 w-10 text-lime-500 dark:text-lime-400" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
        Sipariş Başarılı!
      </h1>
      <h3 className="mt-8 text-2xl leading-7">
        Teşekkürler, <span className="font-extrabold">{customerDetails.name}</span>!
      </h3>
      <p className="mt-8">
        E-postanızı kontrol edin{" "}
        <span className="mx-1 font-extrabold text-indigo-500">{customerDetails.email}</span> faturanız için.
      </p>
    </>
  )
}


