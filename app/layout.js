import { Roboto } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '@/components/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

export const metadata = {
  title: 'Sanctions Database | Professional Compliance Dashboard',
  description: 'Enterprise-grade UI for sanctions data, PEP screening, and criminal records.',
  icons: {
    icon: '/fevicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#F1F5F9]">
      <body className={`${roboto.className} h-full`}>
        <AuthProvider>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

