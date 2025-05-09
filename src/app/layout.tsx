
import '@/index.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import I18nProvider from '@/components/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Brevet Roster',
  description: 'Randonneuring events and community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen flex flex-col">
              <NavBar />
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </TooltipProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
