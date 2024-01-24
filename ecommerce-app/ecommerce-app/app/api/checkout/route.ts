import { NextResponse } from "next/server"
// @ts-ignore
import { validateCartItems } from "use-shopping-cart/utilities"

import { inventory } from "@/config/inventory"
import { stripe } from "@/lib/stripe"

// POST metodunu işleyen fonksiyon
export async function POST(request: Request) {
    // İstekten JSON formatındaki sepet detaylarını al
    const cartDetails = await request.json()

    // Sepet öğelerini onayla ve doğrula
    const lineItems = validateCartItems(inventory, cartDetails)

    // İstek geldiği origin'i al
    const origin = request.headers.get('origin')

    // Stripe Checkout Session oluştur
    const session = await stripe.checkout.sessions.create({
        submit_type: "pay",  // Ödeme türü: 'pay'
        mode: "payment",  // Mod: 'payment'
        payment_method_types: ['card'],  // Kullanılabilir ödeme yöntemleri: kredi kartı
        line_items: lineItems,  // Sepet öğeleri
        shipping_address_collection: {
            allowed_countries: ['US']  // İzin verilen ülkeler: sadece ABD
        },
        shipping_options: [
            {
                shipping_rate: "shr_1OXaH3Cd6jxSeLxuhBaI1ceU"  // Kargo ücreti
            }
        ],
        billing_address_collection: "auto",  // Fatura adresi toplama: otomatik
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,  // Başarılı ödeme durumunda yönlendirilecek URL
        cancel_url: `${origin}/cart`  // İptal durumunda yönlendirilecek URL
    })

    // Oluşturulan Checkout Session'ı JSON formatında yanıtla
    return NextResponse.json(session)
}
