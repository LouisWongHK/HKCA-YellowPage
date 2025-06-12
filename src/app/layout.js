import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "🇨🇦加拿大港人黃頁🇨🇦 | 港人平台一站式導航",
  description: "集合所有加拿大港人組織、港式餐廳、旅遊資訊、移民理財頻道的平台導航，助你一click直達各大社交媒體與社群。",
  keywords: [
    "加拿大港人",
    "香港人移民",
    "港式餐廳",
    "港人黃頁",
    "移民加拿大",
    "加拿大生活資訊",
    "港人社群",
    "加拿大旅遊",
    "理財頻道",
    "加拿大香港人組織"
  ],
  openGraph: {
    title: "🇨🇦加拿大港人黃頁🇨🇦 | 港人平台一站式導航",
    description: "一個集合加拿大港人組織、飲食、旅遊、理財平台的網站，幫你快速連結所有社群資訊。",
    url: "https://hkca-yellowpage.onrender.com/",
    siteName: "加拿大港人黃頁",
    images: [
      {
        url: "https://hkca-yellowpage.onrender.com/", // customize this
        width: 1200,
        height: 630,
        alt: "加拿大港人黃頁封面",
      },
    ],
    locale: "zh-Hant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🇨🇦加拿大港人黃頁🇨🇦 | 港人平台一站式導航",
    description: "集合所有加拿大港人組織、港式餐廳、旅遊資訊、移民理財頻道的平台導航。",
    images: ["https://i.imgur.com/plGQn9c.png"],
  },
  metadataBase: new URL("https://hkca-yellowpage.onrender.com/"),
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-1MS2F677X1" />
    </html>
  );
}
