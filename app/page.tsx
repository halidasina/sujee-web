'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
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
    id: '950gm',
    name: 'Kek Suji Klasik 950gm',
    price: 95,
    image: '/images/cake-1kg.jpg',
    description: 'Saiz premium untuk majlis & hadiah istimewa. Cukup untuk 10–12 orang.',
    badge: 'Premium',
  },
]

const usps = [
  {
    icon: '🌾',
    title: 'Serbuk Suji & Badam',
    desc: '48% serbuk suji + 38% serbuk badam — gabungan unik yang bagi tekstur lembut, moist & rasa yang kaya.',
  },
  {
    icon: '🧈',
    title: 'Butter Premium',
    desc: 'Hanya guna butter premium berkualiti tinggi untuk rasa yang kaya dan wangi.',
  },
  {
    icon: '✨',
    title: 'Rendah Gluten',
    desc: 'Hanya 14% tepung gandum berbanding 48% serbuk suji & 38% serbuk badam — lebih ringan di perut.',
  },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [sending, setSending] = useState(false)
  const orderRef = useRef<HTMLDivElement>(null)

  function scrollToOrder(productId?: string) {
    if (productId) {
      const p = products.find((p) => p.id === productId)
      if (p) setSelectedProduct(p)
    }
    setTimeout(() => {
      orderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const formFilled = name.trim() && phone.trim() && address.trim()
  const waMsg = `Salam! Saya nak order *${selectedProduct.name}* (RM${selectedProduct.price}).

👤 *Nama:* ${name}
📞 *No. Tel:* ${phone}
📦 *Alamat Penghantaran:*
${address}

Boleh tolong check delivery fee?`

  async function handleOrder() {
    if (!formFilled || sending) return
    setSending(true)
    try {
      await fetch('/api/log-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          product: selectedProduct.name,
          price: selectedProduct.price,
          address,
        }),
      })
    } catch {
      // Logging failed — still open WhatsApp so customer isn't blocked
    }
    window.open(waUrl(waMsg), '_blank', 'noopener,noreferrer')
    setSending(false)
  }

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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToOrder()}
            className="bg-[#c8973a] hover:bg-[#b07d2a] text-white font-sans text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer"
          >
            Order Sekarang
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">
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
                Kek Sujee kami menggunakan mentega premium, tepung suji & almond berkualiti tinggi.
                Rasanya lemak, wangi dan tidak terlalu manis.
                Teksturnya unik — sedikit berbiji tetapi lembut dan moist di dalam.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollToOrder()}
                  className="text-center bg-[#c8973a] hover:bg-[#b07d2a] text-white font-sans font-medium px-8 py-4 rounded-xl transition-colors duration-200 cursor-pointer"
                >
                  Order Sekarang
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#products"
                  className="text-center border-2 border-[#c8973a] text-[#c8973a] hover:bg-[#c8973a] hover:text-white font-sans font-medium px-8 py-4 rounded-xl transition-all duration-200"
                >
                  Lihat Menu
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-8"
              >
                {[
                  { value: '48%', label: 'Serbuk Suji' },
                  { value: '38%', label: 'Serbuk Badam' },
                  { value: '14%', label: 'Tepung Gandum' },
                ].map((stat, i) => (
                  <div key={i} className={i > 0 ? 'border-l border-[#c8973a]/20 pl-8' : ''}>
                    <p className="text-2xl font-serif text-[#c8973a] font-bold">{stat.value}</p>
                    <p className="text-xs font-sans text-[#5c3d2e]/60 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

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
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ScaleOnHover className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#c8973a]/10 h-full">
                  <div className="relative overflow-hidden">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToOrder(product.id)}
                        className="flex items-center gap-2 bg-[#c8973a] hover:bg-[#b07d2a] text-white font-sans text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                      >
                        Order
                      </motion.button>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" ref={orderRef} className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <span className="text-sm uppercase tracking-widest text-[#c8973a] font-sans">Tempah Sekarang</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5c3d2e] mt-2">
              Isi Butiran Order
            </h2>
            <p className="text-[#5c3d2e]/70 mt-3 font-sans text-sm">
              Pilih saiz & masukkan alamat — kami akan confirm delivery fee terus via WhatsApp
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[
                { icon: '🍰', text: 'Bake to Order' },
                { icon: '🕕', text: 'Order sebelum 6pm' },
                { icon: '🚀', text: 'Next Day Delivery' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-[#c8973a]/10 border border-[#c8973a]/30 rounded-full px-4 py-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-sans text-[#5c3d2e] font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-[#fdf8f0] rounded-2xl p-8 shadow-sm border border-[#c8973a]/20">
              <p className="text-sm font-sans text-[#5c3d2e] font-medium mb-3">Pilih Saiz</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                      selectedProduct.id === p.id
                        ? 'border-[#c8973a] bg-[#c8973a]/10'
                        : 'border-[#c8973a]/20 bg-white hover:border-[#c8973a]/50'
                    }`}
                  >
                    <p className="font-sans text-sm font-semibold text-[#5c3d2e]">{p.id === '450gm' ? '450gm' : '950gm'}</p>
                    <p className="font-serif text-xl text-[#c8973a] font-bold">RM {p.price}</p>
                    <p className="font-sans text-xs text-[#5c3d2e]/60 mt-1">{p.description}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-sans text-[#5c3d2e] mb-2 font-medium">Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ahmad bin Ali"
                    className="w-full border border-[#c8973a]/30 rounded-xl p-4 text-sm font-sans text-[#5c3d2e] bg-white focus:outline-none focus:border-[#c8973a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-sans text-[#5c3d2e] mb-2 font-medium">No. Telefon</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="011-1234 5678"
                    className="w-full border border-[#c8973a]/30 rounded-xl p-4 text-sm font-sans text-[#5c3d2e] bg-white focus:outline-none focus:border-[#c8973a]"
                  />
                </div>
              </div>

              <label className="block text-sm font-sans text-[#5c3d2e] mb-2 font-medium">Alamat Penghantaran</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="No 12, Jalan Ampang, 50450 Kuala Lumpur"
                rows={3}
                className="w-full border border-[#c8973a]/30 rounded-xl p-4 text-sm font-sans text-[#5c3d2e] bg-white focus:outline-none focus:border-[#c8973a] resize-none"
              />
              <p className="text-xs font-sans text-[#5c3d2e]/50 mt-1 mb-5">Penghantaran via Lalamove — KL & Selangor sahaja</p>

              <motion.button
                whileHover={{ scale: formFilled ? 1.02 : 1 }}
                whileTap={{ scale: formFilled ? 0.98 : 1 }}
                onClick={handleOrder}
                disabled={!formFilled || sending}
                className={`w-full flex items-center justify-center gap-3 font-sans font-medium py-4 rounded-xl transition-colors duration-200 ${
                  formFilled && !sending
                    ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {sending ? 'Menghantar...' : formFilled ? 'Hantar Order via WhatsApp' : 'Isi semua maklumat dahulu'}
              </motion.button>

              <p className="mt-4 text-center text-xs font-sans text-[#5c3d2e]/50">
                Kami akan reply dengan delivery fee & confirm order dalam masa singkat
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#5c3d2e] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <FadeIn direction="right">
              <h3 className="font-serif text-2xl mb-1"><span className="text-[#c8973a]">Kek Suji</span> Klasik</h3>
              <p className="font-sans text-xs text-[#c8973a]/70 mb-3 uppercase tracking-widest">by Molife Delights</p>
              <p className="font-sans text-sm text-white/60 leading-relaxed">Dibakar segar atas tempahan. Menggunakan mentega premium, serbuk suji & badam terpilih — kualiti yang boleh dirasa.</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#c8973a] mb-4">Hubungi Kami</h4>
              <div className="space-y-3">
                <motion.button whileHover={{ x: 4 }} onClick={() => scrollToOrder()} className="flex items-center gap-3 font-sans text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Kami
                </motion.button>
                <motion.a whileHover={{ x: 4 }} href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-sans text-sm text-white/70 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
                  @molifedelights
                </motion.a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#c8973a] mb-4">Cara Order</h4>
              <ol className="space-y-2 font-sans text-sm text-white/70">
                {['Pilih saiz kek (450gm / 950gm)', 'Isi alamat penghantaran', 'Klik "Hantar Order via WhatsApp"', 'Kami confirm delivery fee & bayaran'].map((step, i) => (
                  <li key={i} className="flex gap-2"><span className="text-[#c8973a] font-bold">{i + 1}.</span>{step}</li>
                ))}
              </ol>
            </FadeIn>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="font-sans text-xs text-white/40">© {new Date().getFullYear()} Kek Suji Klasik by Molife Delights · suji.com.my · All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating WA Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollToOrder()}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 cursor-pointer"
        aria-label="Order"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.button>
    </main>
  )
}
