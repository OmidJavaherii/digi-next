import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Vazirmatn } from 'next/font/google';

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'چک پی - فروشگاه دیجیتال',
  description: 'پرداخت آسان و سریع',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.className} antialiased bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}