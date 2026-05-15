import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WasteWise ERP - Smart Waste Management",
  description: "Advanced enterprise-level ERP for smart waste collection and management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

