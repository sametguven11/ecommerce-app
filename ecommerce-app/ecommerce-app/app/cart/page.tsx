// Sepet öğeleri ve özetini içe aktar
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"

// Sayfa bileşeni
export default function Page() {
  return (
    <div>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Sayfa başlığı */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sepetim
        </h1>

        {/* Form alanı ve sepet öğeleri */}
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            {/* Sepet başlığı (Ekran okuyucu için görünmez) */}
            <h2 id="cart-heading" className="sr-only">
              Sepetinizdeki Ürünler
            </h2>

            {/* Sepet öğelerini gösteren bileşen */}
            <CartItems />
          </section>

          {/* Sepet özetini gösteren bileşen */}
          <CartSummary />
        </form>
      </main>
    </div>
  )
}
