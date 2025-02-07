import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import Chat from "@/components/chatbot-finance";

// get yourfont

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finance-Mang",
  description: "Manage your business",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* headweer  */}
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Header />
          <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">{children}</main>
          <Chat />
          <Toaster riichColors />
          {/* footwear  */}
          <footer className="bg-sky-300 dark:bg-gray-800 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
              <p>finance management by Ak</p>
            </div>
          </footer>
          </ ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
