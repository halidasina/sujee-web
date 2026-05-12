import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@/components/Analytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://suji.com.my'),
  title: 'Kek Suji Klasik by Molife Delights | suji.com.my',
  description: 'Kek Suji Klasik by Molife Delights — dibuat dengan tepung suji, tepung almond & butter premium. Hanya 2 sudu besar tepung gandum. Lembut, wangi & meleleh di mulut. Order sekarang!',
  keywords: 'kek suji, kek suji klasik, kek suji almond, kek suji kajang, molife delights, beli kek suji online, kek suji premium malaysia',
  openGraph: {
    title: 'Kek Suji Klasik by Molife Delights | suji.com.my',
    description: 'Tepung suji + tepung almond + butter premium. Hanya 2 tbsp tepung gandum. Order online dari Kajang, penghantaran via Lalamove.',
    url: 'https://suji.com.my',
    siteName: 'Kek Suji Premium',
    images: [
      {
        url: '/images/cake-1kg.jpg',
        width: 1080,
        height: 1080,
        alt: 'Kek Suji Premium 1kg',
      },
    ],
    locale: 'ms_MY',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ms">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
