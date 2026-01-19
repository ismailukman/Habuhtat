import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "react-hot-toast"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Habuhtat Media - Amplifying Local Heroes",
  description: "Connecting grassroots change-makers with global audiences through AI-powered storytelling across environment, health, culture, and entrepreneurship.",
  keywords: [
    "environmental",
    "health",
    "medicine",
    "social impact",
    "culture",
    "entrepreneurship",
    "heroes",
    "storytelling",
    "journalism",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid #e2e8f0',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
