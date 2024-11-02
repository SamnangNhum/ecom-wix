import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '700'] });

export const metadata: Metadata = {
  title: {
    template: "%s | FlyByBox",
    absolute: "FlyByBox"
  },
  description: "Electronics store offering the latest in technology and gadgets to enhance your digital life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
