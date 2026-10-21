import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import SystemGrabOverlay from '@/components/global/SystemGrabOverlay';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'FW Labs | Independent Engineering Studio',
    template: '%s | FW Labs',
  },
  description: 'High-performance websites, custom web applications, and intelligent software designed around the way your business works.',
  keywords: ['Web Development', 'Engineering Studio', 'Next.js', 'React', 'Software Agency', 'Web Design', 'Full Stack Development', 'AI Automation'],
  authors: [{ name: 'FW Labs' }],
  creator: 'FW Labs',
  metadataBase: new URL('https://fwlabs.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fwlabs.vercel.app/',
    title: 'FW Labs | Independent Engineering Studio',
    description: 'Operating at the intersection of premium design and reliable performance.',
    siteName: 'FW Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FW Labs Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FW Labs | Independent Engineering Studio',
    description: 'Operating at the intersection of premium design and reliable performance.',
    images: ['/og-image.png'],
    creator: '@fay_salwani',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "FW Labs",
  "url": "https://fwlabs.vercel.app/",
  "logo": "https://fwlabs.vercel.app/logo.svg",
  "description": "Independent Engineering Studio building high-performance web applications and digital infrastructure.",
  "areaServed": ["IN", "US", "GB", "CA", "AU"],
  "availableLanguage": ["English"],
  "knowsAbout": ["Web Development", "Software Engineering", "AI Automation", "E-commerce", "Full-Stack Development"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}>
      <body className="bg-background text-foreground antialiased selection:bg-[#4ade80] selection:text-black min-h-screen flex flex-col font-sans overflow-x-hidden">
        {/* Inject JSON-LD into the HTML for Google Search Crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navbar />
        
        <main className="grow">
          {children}
        </main>
        
        <Footer />
        <SystemGrabOverlay />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}