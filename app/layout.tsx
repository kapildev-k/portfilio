import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kapildev K | Software Engineer',
  description:
    'Kapildev K is a software engineer working across AWS cloud security, backend engineering, DevOps, SRE, endpoint compliance, monitoring, and private retrieval systems.',
  keywords: [
    'Kapildev K',
    'software engineer',
    'AWS cloud security',
    'Python developer',
    'backend engineering',
    'DevOps',
    'Site Reliability Engineering',
    'endpoint compliance',
    'monitoring and observability',
  ],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Kapildev K | Software Engineer',
    description:
      'Cloud security, backend engineering, endpoint compliance, and observability portfolio.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kapildev K | Software Engineer',
    description: 'Cloud security, backend engineering, endpoint compliance, and observability.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
