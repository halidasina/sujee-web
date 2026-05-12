import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export const runtime = 'nodejs'
export const maxDuration = 30

const API_KEY = process.env.LALAMOVE_API_KEY!
const API_SECRET = process.env.LALAMOVE_API_SECRET!
const BASE_URL = process.env.LALAMOVE_BASE_URL || 'https://rest.lalamove.com'

const PICKUP_LAT = process.env.PICKUP_LAT || '2.9982'
const PICKUP_LNG = process.env.PICKUP_LNG || '101.7945'
const PICKUP_ADDRESS = process.env.PICKUP_ADDRESS || '26, Jalan Taman Bangi Avenue 7/13, Taman Bangi Avenue, 43000 Kajang, Selangor'

function generateSignature(method: string, path: string, body: string, timestamp: string) {
  const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${body}`
  return createHmac('sha256', API_SECRET).update(rawSignature).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const { deliveryLat, deliveryLng, deliveryAddress } = await req.json()

    if (!deliveryLat || !deliveryLng) {
      return NextResponse.json({ error: 'Sila masukkan alamat penghantaran' }, { status: 400 })
    }

    const timestamp = Date.now().toString()
    const path = '/v3/quotations'

    const requestBody = {
      serviceType: 'MOTORCYCLE',
      language: 'en_MY',
      stops: [
        {
          coordinates: {
            lat: String(PICKUP_LAT),
            lng: String(PICKUP_LNG),
          },
          address: PICKUP_ADDRESS,
        },
        {
          coordinates: {
            lat: String(deliveryLat),
            lng: String(deliveryLng),
          },
          address: deliveryAddress,
        },
      ],
      item: {
        quantity: '1',
        weight: 'LESS_THAN_3KG',
      },
    }

    const body = JSON.stringify(requestBody)
    const signature = generateSignature('POST', path, body, timestamp)

    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `hmac ${API_KEY}:${timestamp}:${signature}`,
        'X-LLM-Country': 'MY',
        'X-Request-ID': `suji-${timestamp}`,
      },
      body,
      signal: AbortSignal.timeout(15000),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Lalamove error:', response.status, JSON.stringify(data))
      const llmMsg = data?.message || data?.error || `Lalamove error ${response.status}`
      return NextResponse.json({ error: llmMsg, debug: data })
    }

    const priceBreakdown = data.priceBreakdown
    const totalFee = priceBreakdown?.total
      ? (parseInt(priceBreakdown.total) / 100).toFixed(2)
      : null

    return NextResponse.json({
      fee: totalFee,
      currency: 'MYR',
      serviceType: data.serviceType,
    })
  } catch (err) {
    console.error('Lalamove exception:', err)
    return NextResponse.json({ error: 'Ralat sistem. Sila cuba lagi.' }, { status: 500 })
  }
}
