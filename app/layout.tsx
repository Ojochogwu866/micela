import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";


const raleway = Raleway({ subsets: ["cyrillic"]})

export const metadata: Metadata = {
  title: "Micela Pay",
  description: "Send Money to users using email and phone number",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body  className={`${raleway.className} bg-[#ffffff]`}>
        {children}</body>
    </html>
  );
}
