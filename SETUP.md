# Setup Guide — Kek Suji Website

## 1. Salin Gambar Produk

Salin gambar ke folder `public/images/`:
- `public/images/cake-450gm.jpg` → gambar kek 450gm
- `public/images/cake-1kg.jpg` → gambar kek 1kg bundt

## 2. Buat File `.env.local`

Salin dari `.env.local.example`:
```bash
cp .env.local.example .env.local
```

Isi semua nilai dalam `.env.local`:

```env
LALAMOVE_API_KEY=xxx
LALAMOVE_API_SECRET=xxx
NEXT_PUBLIC_META_PIXEL_ID=xxx
NEXT_PUBLIC_GOOGLE_TAG_ID=G-xxx
NEXT_PUBLIC_WHATSAPP_NUMBER=601XXXXXXXX
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@username
PICKUP_LAT=3.1390
PICKUP_LNG=101.6869
PICKUP_ADDRESS=No X, Jalan XXX, Kuala Lumpur
```

## 3. Setup Lalamove API

1. Daftar di https://developers.lalamove.com/
2. Create app → dapat API Key & Secret
3. Masuk dalam `.env.local`

## 4. Setup GitHub + Vercel

### GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/suji-website.git
git push -u origin main
```

### Vercel
1. Login https://vercel.com
2. Import GitHub repo
3. Add semua env variables dari `.env.local`
4. Deploy

### Domain (suji.com.my via Exabytes)
1. Dalam Vercel → Project → Settings → Domains
2. Add `suji.com.my`
3. Vercel akan bagi DNS records
4. Pergi Exabytes → DNS Management
5. Add records yang Vercel bagi

## 5. Meta Pixel & Google Analytics

### Meta Pixel
1. https://business.facebook.com → Events Manager
2. Create Pixel → dapat Pixel ID
3. Masuk `NEXT_PUBLIC_META_PIXEL_ID` dalam env

### Google Analytics
1. https://analytics.google.com
2. Create property → Web → dapat Measurement ID (G-xxx)
3. Masuk `NEXT_PUBLIC_GOOGLE_TAG_ID` dalam env

## Dev Server (Test Local)
```bash
npm run dev
```
Buka http://localhost:3000
