import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SiteOps360 | Construction Operations',
  description: 'Construction site workforce and operations management platform.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
