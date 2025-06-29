import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProviderWraper from "@/components/providers/RootContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Layout({ children }) {
  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProviderWraper>
            {children}
        </ProviderWraper>
          <Toaster position="top-right" />
      </body>
    </html>
  );
}
