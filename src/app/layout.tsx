import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import { ModeToggle } from "@/app/components/theme-toggler"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SAAS",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <nav className="pt-2 px-4 flex justify-end">
            <ModeToggle />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}