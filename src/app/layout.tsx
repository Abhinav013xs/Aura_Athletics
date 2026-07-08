import type { Metadata } from "next";
import { Bebas_Neue, Poppins, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AURA ATHLETICS | Premium Luxury Fitness Club",
  description: "Experience the epitome of luxury fitness. High-end training, luxury wellness facilities, state-of-the-art 3D coaching, and personal training.",
  openGraph: {
    title: "AURA ATHLETICS | Premium Luxury Fitness Club",
    description: "Experience the epitome of luxury fitness. High-end training, luxury wellness facilities, and state-of-the-art 3D coaching.",
    type: "website",
    locale: "en_US",
    url: "https://auraathletics.com",
    siteName: "AURA ATHLETICS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-background">
        {children}
      </body>
    </html>
  );
}
