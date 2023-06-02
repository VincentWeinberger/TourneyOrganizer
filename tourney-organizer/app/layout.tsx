import './globals.css'
import { Climate_Crisis } from "next/font/google"

const cc = Climate_Crisis({subsets: ['latin']})

export const metadata = {
  title: 'Tournament Organizer & Scorekeeper',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cc.className}>{children}</body>
    </html>
  )
}
