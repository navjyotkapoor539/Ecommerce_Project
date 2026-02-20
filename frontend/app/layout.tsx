import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ReduxProvider from "./ReduxProvider";
import AuthInitializer from "./components/AuthInitializer";
import { Toaster } from "sonner";
import ReactQueryProvider from "./ReactQueryProvider";

export const metadata: Metadata = {
  title: 'ShopStyle - Fashion, Electronics & FootWears',
  description: 'Your one-stop shop for trendy clothes, latest electronics, and stylish footwear. Quality products, unbeatable prices, and fast delivery.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ReduxProvider><ReactQueryProvider><AuthInitializer/>{children}</ReactQueryProvider></ReduxProvider>
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
