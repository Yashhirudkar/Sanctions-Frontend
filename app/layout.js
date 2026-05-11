import { Roboto } from 'next/font/google';
import '../styles/globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

export const metadata = {
  title: 'Sanctions Database | Professional Compliance Dashboard',
  description: 'Enterprise-grade UI for sanctions data, PEP screening, and criminal records.',
};

import DashboardLayout from '@/components/DashboardLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#F1F5F9]">
      <body className={`${roboto.className} h-full`}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
