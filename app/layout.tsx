import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '🎉 Rejoins SkibidiBous sur son site magique !',
  description: 'Clique ici, mon ami ! Une surprise t’attend...',
  openGraph: {
    title: '🔥 OUVRE CE SITE, VITE ! 🔥',
    description: 'SkibidiBous a préparé un truc super cool pour toi !',
    url: 'https://skibidibous.vercel.app', // ← REMPLACE par ton vrai domaine plus tard
    siteName: 'SkibidiBous',
    images: [
      {
        url: 'https://skibidibous.vercel.app/skibidi.png', // ← REMPLACE aussi
        width: 1200,
        height: 630,
        alt: 'SkibidiBous le GOAT',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🎉 Rejoins SkibidiBous sur son site magique !',
    description: 'Clique, c’est gratuit !',
    images: ['https://skibidibous.vercel.app/skibidi.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, backgroundColor: 'white', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}