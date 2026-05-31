import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import './globals.css'

const SITE_NAME = 'Mentra'
const SITE_DESC =
  'A curated reference of psychological tools — searchable by what you’re feeling.'

export const metadata: Metadata = {
  metadataBase: new URL('https://mentra.vercel.app'),
  title: {
    default: `${SITE_NAME} — psychological tools for what you’re feeling`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESC,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfa' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0d' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <header className="border-b border-border">
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6"
          >
            <Link href="/" className="text-lg font-bold text-text">
              Mentra
            </Link>
            <div className="flex items-center gap-5 text-sm font-medium text-muted">
              <Link href="/tools/" className="hover:text-accent">
                Tools
              </Link>
              <Link href="/about/" className="hover:text-accent">
                About
              </Link>
              <Link
                href="/crisis/"
                className="font-semibold text-accent hover:opacity-80"
              >
                Crisis support
              </Link>
            </div>
          </nav>
        </header>

        <main id="main" className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm leading-relaxed text-muted sm:px-6">
            <p>
              These tools are for educational purposes and everyday emotional
              challenges. They are not a substitute for professional mental
              health care. If you are in crisis, call or text{' '}
              <strong className="text-text">988</strong> (US), or{' '}
              <Link
                href="/crisis/"
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                find a crisis line in your country
              </Link>
              .
            </p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/crisis/" className="text-accent hover:opacity-80">
                Crisis support
              </Link>
              <Link href="/about/" className="text-accent hover:opacity-80">
                About &amp; credits
              </Link>
            </p>
            <p className="mt-6 border-t border-border pt-6">
              Built with care by{' '}
              <a
                href="https://www.linkedin.com/in/rohini-raja/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
              >
                Rohini
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
