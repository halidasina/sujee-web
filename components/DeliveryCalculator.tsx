'use client'

import { useState } from 'react'

interface DeliveryResult {
  fee: string | null
  currency: string
  error?: string
}

const COVERAGE_AREAS = [
  'kuala lumpur', 'wilayah persekutuan',
  'selangor', 'shah alam', 'petaling jaya', 'subang', 'klang',
  'ampang', 'cheras', 'puchong', 'sepang', 'kajang', 'semenyih',
  'rawang', 'gombak', 'kepong', 'damansara', 'bangsar', 'mont kiara',
  'sri petaling', 'bukit jalil', 'cyberjaya', 'putrajaya',
]

function isInCoverage(displayName: string): boolean {
  const lower = displayName.toLowerCase()
  return COVERAGE_AREAS.some((area) => lower.includes(area))
}

export function DeliveryCalculator() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DeliveryResult | null>(null)

  const WA_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.link/j1c283'
  const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const waOrderUrl = (msg: string) =>
    WA_NUMBER ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}` : WA_LINK

  async function calculateDelivery() {
    if (!address.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ', Malaysia')}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'ms' } }
      )
      const geoData = await geoRes.json()

      if (!geoData || geoData.length === 0) {
        setResult({ fee: null, currency: 'MYR', error: 'Alamat tidak dijumpai. Cuba masukkan alamat yang lebih tepat.' })
        setLoading(false)
        return
      }

      const { lat, lon, display_name } = geoData[0]

      if (!isInCoverage(display_name)) {
        setResult({
          fee: null,
          currency: 'MYR',
          error: 'Maaf, penghantaran hanya untuk kawasan Kuala Lumpur & Selangor sahaja.',
        })
        setLoading(false)
        return
      }

      const res = await fetch('/api/lalamove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryLat: lat, deliveryLng: lon, deliveryAddress: address }),
      })

      const data = await res.json()

      if (data.error) {
        setResult({ fee: null, currency: 'MYR', error: data.error })
      } else {
        setResult({ fee: data.fee, currency: data.currency })
      }
    } catch {
      setResult({ fee: null, currency: 'MYR', error: 'Ralat. Sila cuba lagi.' })
    }

    setLoading(false)
  }

  const orderMessage = result?.fee
    ? `Salam! Saya nak order Kek Suji Klasik. Alamat penghantaran: ${address}. Delivery fee (Lalamove): RM${result.fee}. Boleh confirm order?`
    : `Salam! Saya nak order Kek Suji Klasik. Alamat penghantaran: ${address}`

  return (
    <section id="delivery" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-sm uppercase tracking-widest text-[#c8973a] font-sans">Penghantaran</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#5c3d2e] mt-2">
            Check Delivery Fee
          </h2>
          <p className="text-[#5c3d2e]/70 mt-3 font-sans text-sm">
            Penghantaran via Lalamove
          </p>

          {/* Coverage badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-[#c8973a]/10 border border-[#c8973a]/30 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-xs font-sans text-[#5c3d2e] font-medium">
              Kuala Lumpur & Selangor sahaja
            </span>
          </div>
        </div>

        <div className="bg-[#fdf8f0] rounded-2xl p-8 shadow-sm border border-[#c8973a]/20">
          <label className="block text-sm font-sans text-[#5c3d2e] mb-2 font-medium">
            Alamat Penghantaran
          </label>
          <textarea
            value={address}
            onChange={(e) => { setAddress(e.target.value); setResult(null) }}
            placeholder="Contoh: No 12, Jalan Ampang, 50450 Kuala Lumpur"
            rows={3}
            className="w-full border border-[#c8973a]/30 rounded-xl p-4 text-sm font-sans text-[#5c3d2e] bg-white focus:outline-none focus:border-[#c8973a] resize-none"
          />

          <button
            onClick={calculateDelivery}
            disabled={loading || !address.trim()}
            className="mt-4 w-full bg-[#c8973a] hover:bg-[#b07d2a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-sans font-medium py-3 rounded-xl transition-colors duration-200"
          >
            {loading ? 'Sedang calculate...' : 'Calculate Delivery Fee'}
          </button>

          {result && (
            <div className="mt-6">
              {result.error ? (
                <div className="text-center p-5 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-red-600 font-sans text-sm">{result.error}</p>
                  {result.error.includes('KL') || result.error.includes('Selangor') ? (
                    <p className="text-red-400 font-sans text-xs mt-2">
                      Untuk kawasan lain, hubungi kami terus di WhatsApp.
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="text-center p-6 bg-[#c8973a]/10 rounded-xl border border-[#c8973a]/30">
                  <p className="text-sm font-sans text-[#5c3d2e]/70 mb-1">Anggaran Delivery Fee</p>
                  <p className="text-4xl font-serif text-[#c8973a] font-bold">
                    RM {result.fee}
                  </p>
                  <p className="text-xs font-sans text-[#5c3d2e]/50 mt-2">
                    * Harga mungkin berbeza mengikut permintaan semasa Lalamove
                  </p>

                  <a
                    href={waOrderUrl(orderMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-sans font-medium px-8 py-3 rounded-xl transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order via WhatsApp
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
