import type { Metadata } from "next";
import { Geist, Geist_Mono, Patrick_Hand } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "./globals.css";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import FloatingUserMenu from "@/components/dashboard/FloatingUserMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const handwriting = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ShmaplexPlant – Natural Organic Growth Solutions",
  description:
    "ShmaplexPlant offers premium organic tissue culture media, propagation kits, and natural growth boosters crafted to empower sustainable farming and nurture healthy ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${handwriting.variable} antialiased`}
      >
        <ToastContainer />
        <FloatingUserMenu />
        <CartProvider>
          <div className="w-full font-sans bg-milk-bio/10 print:bg-white text-biochar-black min-h-screen flex flex-col">
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
