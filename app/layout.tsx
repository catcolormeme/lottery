import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CATCOLOR - The first lottery on the Binance Smart Chain',
  description: 'The first lottery on the Binance Smart Chain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
