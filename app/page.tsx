'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { DeliveryCalculator } from '@/components/DeliveryCalculator'
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from '@/components/AnimatedSection'

const WA_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.link/j1c283'
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@molifedelights'

function waUrl(message?: string) {
  if (WA_NUMBER && message) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  }
  return WA_LINK
}

const products = [
  {
    id: '450gm',
    name: 'Kek Suji Klasik 450gm',
    price: 50,
    image: '/images/cake-450gm.jpg',
    description: 'Saiz sempurna untuk 4–6 orang. Lembut, wangi & meleleh di mulut.',
    badge: 'Best Seller',
  },
  {
    id: '1kg',
    name: 'Kek Suji Klasik 1kg',
    price: 95,
    image: '/images/cake-1kg.jpg',
    description: 'Saiz premium untuk majlis & hadiah istimewa. Cukup untuk 10–12 orang.',
    badge: 'Premium',
  },
]

const usps = [
  {
    icon: '🌾',
    title: 'Tepung Suji & Almond',
    desc: 'Gabungan tepung suji & tepung almond untuk tekstur yang unik — lembut luar, moist dalam.',
  },
  {
    icon: '🧈',
    title: 'Butter Premium',
    desc: 'Hanya guna butter premium berkualiti tinggi untuk rasa yang kaya dan wangi.',
  },
  {
    icon: '✨',
    title: 'Hampir Bebas Gluten',
    desc: 'Hanya 2 sudu besar tepung gandum — sesuai untuk yang sensitif gluten.',
  },
]

export default function Home() {
  const waHeroMsg = 'Salam! Saya nak tanya pasal Kek Suji Klasik. Boleh share maklumat lanjut?'

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fdf8f0' }}>

      {/* NAV */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f0]/90 backdrop-blur-sm border-b border-[#c8973a]/20"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-serif text-xl text-[#5c3d2e]">
            <span className="text-[#c8973a]">Kek Suji</span> Klasik
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={waUrl(waHeroMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c8973a] hover:bg-[#b07d2a] text-white font-sans text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200"
          >
            Order Sekarang
          </motion.a>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Text */}
            <div className="order-2 md:order-1">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block text-xs uppercase tracking-widest text-[#c8973a] font-sans mb-4 border border-[#c8973a]/40 px-3 py-1 rounded-full"
              >
                Kek Tradisional Premium · Molife Delights
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#5c3d2e] leading-tight mb-6"
              >
                Kek Suji Klasik<br />
                <span className="text-[#c8973a]">Yang Berbeza</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-[#5c3d2e]/70 font-sans text-lg leading-relaxed mb-8"
              >
                Resepi istimewa — tepung suji, tepung almond & butter premium.
                Hanya 2 sudu besar tepung gandum. Lembut, moist & meleleh di mulut.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#products"
                  className="text-center bg-[#c8973a] hover:bg-[#b07d2a] text-white font-sans font-medium px-8 py-4 rounded-xl transition-colors duration-200"
                >
                  Lihat Harga
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={waUrl(waHeroMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center border-2 border-[#c8973a] text-[#c8973a] hover:bg-[#c8973a] hover:text-white font-sans font-medium px-8 py-4 rounded-xl transition-all duration-200"
                >
                  Tanya Kami
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-8"
              >
                {[
                  { value: '100%', label: 'Butter Premium' },
                  { value: '2 tbsp', label: 'Tepung Gandum Sahaja' },
                  { value: 'Suji+', label: 'Tepung Almond' },
                ].map((stat, i) => (
                  <div key={i} className={i > 0 ? 'border-l border-[#c8973a]/20 pl-8' : ''}>
                    <p className="text-2xl font-serif text-[#c8973a] font-bold">{stat.value}</p>
                    <p className="text-xs font-sans text-[#5c3d2e]/60 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="order-1 md:order-2 relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <motion.div
                  animate={{ rotate: [3, 4, 3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-[#c8973a]/10 rounded-3xl"
                />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/cake-1kg.jpg"
                    alt="Kek Suji Klasik 1kg"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-[#c8973a]/20"
                >
                  <p className="text-xs font-sans text-[#5c3d2e]/60 uppercase tracking-wide">Mula dari</p>
                  <p className="text-2xl font-serif text-[#c8973a] font-bold">RM 50</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <span className="text-sm uppercase tracking-widest text-[#c8973a] font-sans">Kenapa Pilih Kami?</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5c3d2e] mt-2">
              Bahan Pilihan, Rasa Istimewa
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {usps.map((usp) => (
              <StaggerItem key={usp.title}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(200,151,58,0.15)' }}
                  transition={{ duration: 0.2 }}
                  className="text-center p-8 rounded-2xl border border-[#c8973a]/20 cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl mb-4 inline-block"
                  >
                    {usp.icon}
                  </motion.div>
                  <h3 className="font-serif text-xl text-[#5c3d2e] mb-3">{usp.title}</h3>
                  <p className="font-sans text-sm text-[#5c3d2e]/70 leading-relaxed">{usp.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20" style={{ backgroundColor: '#fdf8f0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <span className="text-sm uppercase tracking-widest text-[#c8973a] font-sans">Menu</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5c3d2e] mt-2">
              Pilih Saiz Anda
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {products.map((product) => {
              const waMsg = `Salam! Saya nak order ${product.name} (RM${product.price}). Boleh confirm stok & cara bayar?`
              return (
                <StaggerItem key={product.id}>
                  <ScaleOnHover className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#c8973a]/10 h-full">
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={600}
                          height={500}
                          className="w-full h-72 object-cover"
                        />
                      </motion.div>
                      <span className="absolute top-4 left-4 bg-[#c8973a] text-white text-xs font-sans font-medium px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>
                    <div className="p-8">
                      <h3 className="font-serif text-2xl text-[#5c3d2e] mb-2">{product.name}</h3>
                      <p className="font-sans text-sm text-[#5c3d2e]/70 leading-relaxed mb-6">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-sans text-[#5c3d2e]/50 uppercase tracking-wide">Harga</p>
                          <p className="text-3xl font-serif text-[#c8973a] font-bold">RM {product.price}</p>
                        </div>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={waUrl(waMsg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-sans text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Order
                        </motion.a>
                      </div>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* DELIVERY CALCULATOR */}
      <DeliveryCalculator />

      {/* FOOTER */}
      <footer className="bg-[#5c3d2e] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <FadeIn direction="right">
              <h3 className="font-serif text-2xl mb-1">
                <span className="text-[#c8973a]">Kek Suji</span> Klasik
              </h3>
              <p className="font-sans text-xs text-[#c8973a]/70 mb-3 uppercase tracking-widest">by Molife Delights</p>
              <p className="font-sans text-sm text-white/60 leading-relaxed">
                Kek suji premium dengan tepung suji, tepung almond & butter terbaik.
                Dibuat dengan penuh kasih sayang dari Kajang, Selangor.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#c8973a] mb-4">Hubungi Kami</h4>
              <div className="space-y-3">
                <motion.a
                  whileHover={{ x: 4 }}
                  href={waUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.76-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Kami
                </motion.a>
                <motion.a
                  whileHover={{ x: 4 }}
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-sm text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                  </svg>
                  @molifedelights
                </motion.a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#c8973a] mb-4">Cara Order</h4>
              <ol className="space-y-2 font-sans text-sm text-white/70">
                {[
                  'Pilih saiz kek (450gm / 1kg)',
                  'Check delivery fee di atas',
                  'Klik Order via WhatsApp',
                  'Buat bayaran & tunggu penghantaran',
                ].map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#c8973a] font-bold">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </FadeIn>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="font-sans text-xs text-white/40">
              © {new Date().getFullYear()} Kek Suji Klasik by Molife Delights · suji.com.my · All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={waUrl(waHeroMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
        aria-label="WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </main>
  )
}
