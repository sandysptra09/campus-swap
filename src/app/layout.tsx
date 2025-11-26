import type { Metadata } from "next";
import { Karla } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";

const karla = Karla({
  variable: "--font-karla",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusSwap",
  description: "Sustainable item exchange platform for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${karla.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
