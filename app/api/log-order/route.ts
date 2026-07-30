import { NextRequest, NextResponse } from 'next/server'

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL!

export async function POST(req: NextRequest) {
    try {
          const { name, phone, product, price, address } = await req.json()

      await fetch(APPS_SCRIPT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, phone, product, price, address }),
      })

      return NextResponse.json({ success: true })
    } catch (err) {
          console.error('log-order error:', err)
          return NextResponse.json({ success: false }, { status: 200 })
    }
}
