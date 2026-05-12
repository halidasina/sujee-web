import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const API_KEY = process.env.LALAMOVE_API_KEY!
const API_SECRET = process.env.LALAMOVE_API_SECRET!
const BASE_URL = process.env.LALAMOVE_BASE_URL || 'https://rest.lalamove.com'

const PICKUP_LAT = process.env.PICKUP_LAT || '3.1390'
const PICKUP_LNG = process.env.PICKUP_LNG || '101.6869'
const PICKUP_ADDRESS = process.env.PICKUP_ADDRESS || 'Kuala Lumpur'

function generateSignature(method: string, path: string, body: string, timestamp: string) {
  const rawSignature = `${timestamp}\r\n${method}\r\n${path}\r\n\r\n${body}`
  return crypto.createHmac('sha256', API_SECRET).update(rawSignature).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const { deliveryLat, deliveryLng, deliveryAddress } = await req.json()

    if (!deliveryLat || !deliveryLng) {
      return NextResponse.json({ error: 'Sila masukkan alamat penghantaran' }, { status: 400 })
    }

    const timestamp = Date.now().toString()
    const path = '/v3/quotations'
    const body = JSON.stringify({
      serviceType: 'MOTORCYCLE',
      language: 'ms_MY',
      stops: [
        {
          coordinates: { lat: PICKUP_LAT, lng: PICKUP_LNG },
          address: PICKUP_ADDRESS,
        },
        {
          coordinates: { lat: deliveryLat, lng: deliveryLng },
          address: deliveryAddress,
        },
      ],
      item: {
        quantity: '1',
        weight: 'LESS_THAN_3KG',
        categories: ['FOOD_DELIVERY'],
        handlingInstructions: ['KEEP_UPRIGHT'],
      },
    })

    const signature = generateSignature('POST', path, body, timestamp)

    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `hmac ${API_KEY}:${timestamp}:${signature}`,
        'X-LLM-Country': 'MY',
      },
      body,
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Tidak dapat calculate delivery fee. Cuba semula.' },
        { status: response.status }
      )
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
  } catch {
    return NextResponse.json({ error: 'Ralat sistem. Sila cuba lagi.' }, { status: 500 })
  }
}
