import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "react-hot-toast"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Habuhtat Media - Amplifying Environmental Heroes",
  description: "Connecting grassroots environmental changemakers with global audiences through AI-powered storytelling and human curation.",
  keywords: ["environmental", "heroes", "storytelling", "journalism", "climate", "sustainability"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
