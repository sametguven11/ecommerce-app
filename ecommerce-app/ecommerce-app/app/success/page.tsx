import Link from "next/link"

// Stripe modülünü içe aktar
import { stripe } from "@/lib/stripe"

// CheckoutSession bileşenini içe aktar
import { CheckoutSession } from "@/components/checkout-session"

// Props türünü tanımla
interface Props {
  searchParams: {
    session_id?: string
  }
}

// Sayfa bileşeni
export default async function Page({searchParams}: Props) {
  // Oturum kimliğini al
  const sessionId = searchParams?.session_id ?? ""

  // Stripe API kullanarak checkout oturumunu getir
  const checkoutSession= await stripe.checkout.sessions.retrieve(sessionId)

  // Checkout oturumunun müşteri detaylarını al
  const customerDetails = checkoutSession?.customer_details

  // Sayfa içeriği
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Checkout oturumu */}
        <CheckoutSession customerDetails={customerDetails}/>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* Anasayfaya geri dönme bağlantısı */}
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Anasayfaya geri dön
          </Link>
          {/* Destek bağlantısı */}
          <a href="#" className="text-sm font-semibold">
            Destek <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
