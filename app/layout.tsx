import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "@/lib/AuthProvider";
import ClientProvider from "@/lib/ClientProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vulse Demo",
  description: "Vulse ToDo App Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en" className="bg-white dark:bg-black">
        <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className={inter.className}>{children}</main>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
