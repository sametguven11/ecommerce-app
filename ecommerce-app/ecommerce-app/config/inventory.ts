  import { Image } from "sanity"
  
  // Envanter ürünü için temel özelliklerin tanımlandığı arayüz

interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  categories: string[]
  sizes: string[]
  colors: string[]
  price: number
  currency: string
  description: string
  sku: string
}

// Sanity ürün verileri için genişletilmiş arayüz
export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  _id: string
  _createdAt: Date
  slug: string
  images: Image[]
}
 // Diğer örnek envanter ürünleri...

export const inventory: InventoryProduct[] = [
  
  {
    id: "e882fe48-253c-40fb-8155-51b47b063c1a",
    sku: "audemars-piguet-royal-oak-1",
    name: "Audemars Piguet Royal Oak",
    description: "audemars piguet",
    price: 4999,
    image: "https://i.hizliresim.com/t7udhle.png",
    images: [
      "https://i.hizliresim.com/t7udhle.png",
      
    ],
    sizes: ["one-size"],
    categories: ["wallets"],
    colors: ["kahverengi"],
    currency: "USD",
  },
 
  
  
  
  {
    id: "b284f436-7cb0-4439-a3c3-5ee75abb1c76",
    sku: "breitling-superocean-1",
    name: "Breitling Superocean",
    description: "Marka: Breitling Superocean Otomatik Saat Cinsiyet: Erkek Kadran Rengi: Siyah Kordon Cinsi: Silikon Kasa Çapı: 44 mm Kasa: 316L Çelik Cam Cinsi: Safir Cam Makine Cinsi: Kinetik Otomatik Mekanizma Takvim: Yok",
    price: 39999,
    image: "https://i.hizliresim.com/5z0jnt6.png",
    images: [
      "https://i.hizliresim.com/5z0jnt6.png",
      
    ],
    sizes: ["one-size"],
    categories: ["breitling"],
    colors: ["siyah"],
    currency: "USD",
  
  },
  
 {
    id: "e4e99f55-7d1b-49d8-b13e-e0a13682f81f",
    sku: "rolex-submariner-hulk-1",
    name: "Rolex Submariner Hulk",
    description: "This is a new product description.",
    price: 4999,
    image: "https://i.hizliresim.com/2duzcyf.png",
    images: [
      "https://i.hizliresim.com/2duzcyf.png",
      
    ],
    sizes: ["one-size"],
    categories: ["rolex"],
    colors: ["yeşil"],
    currency: "USD",
  },
  {
    id: "4038417a-c69b-4f7b-9a4d-74b68d46b8a2",
    sku: "audemars-piguet-royal-oak-1",
    name: "Audemars Piguet Royal Oak",
    description: "audemars piguet",
    price: 4999,
    image: "https://i.hizliresim.com/t7udhle.png",
    images: [
      "https://i.hizliresim.com/t7udhle.png",
      
    ],
    sizes: ["one-size"],
    categories: ["ap"],
    colors: ["kahverengi"],
    currency: "USD",
  },
  {
    id: "2555c4b2-36d4-4070-8063-9e16f351fe66",
    sku: "rolex-submariner-pepsi-1",
    name: "Rolex Submariner Pepsi",
    description: "Model: Rolex GMT-Master II Pepsi 3186 Kadran Rengi: Siyah Kordon Cinsi: Jübile Bilezik Kasa Tipi: Çelik 40 Mm Cam Tipi: Safir Cam Kasa: 904l Paslanmaz Çelik",
    price: 59999,
    image: "https://i.hizliresim.com/qckqk70.png",
    images: [
      "https://i.hizliresim.com/qckqk70.png",
      
    ],
    sizes: ["one-size"],
    categories: ["rolex"],
    colors: ["beyaz"],
    currency: "USD",
  },
  {
    id: "c8a8788c-5313-4223-bf92-ca5d972b5745",
    sku: "richard-mille-crono-1",
    name: "Richard Mille Crono",
    description: "Marka: Richard Mille RM055 Yas Marina Circuit Cinsiyet: Erkek Kadran Rengi: Saydam Kordon Cinsi: Kauçuk Kasa Çapı: 42mm x 50mm x 12.5mm Kasa:  Forget Carbon Cam Cinsi: Safir Cam Makine Cinsi: Seiko NH05A Automatic Movement 21600bph Fonksiyonlar: Tüm Fonksiyonlar Aktif Takvim: Yok",
    price: 29999,
    image: "https://i.hizliresim.com/qilbxk2.jpg",
    images: [
      "https://i.hizliresim.com/qilbxk2.jpg",
      "https://i.hizliresim.com/6jyxcb3.jpg"
      
    ],
    sizes: ["m","xl"],
    categories: ["richard"],
    colors: ["mavi"],
    currency: "USD",
  },
  {
    id: "5b319901-bafb-427e-a1ca-754535ed5b66",
    sku: "patek-philippe-celik-1",
    name: "Patek Philippe Çelik",
    description: "Marka: Patek Philippe Nautilus Beyaz Çelik Erkek Kol Saati Cinsiyet: Erkek Kadran Rengi: Beyaz Kordon Cinsi: Çelik Kasa Çapı: 40 mm Kasa: 316L Çelik Cam Cinsi: Safir Cam Makine Cinsi: Kinetik Otomatik Mekanizma Takvim: Var",
    price: 19999,
    image: "https://i.hizliresim.com/n7223bd.jpg",
    images: [
      "https://i.hizliresim.com/n7223bd.jpg",
      "https://i.hizliresim.com/fd6bvoy.jpg"
      
    ],
    sizes: ["one-size"],
    categories: ["patek"],
    colors: ["beyaz"],
    currency: "USD",
  },
  
  
   
]


