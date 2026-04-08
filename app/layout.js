import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
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
          <Header />
          <main className="min-h-screen bg-white text-gray-900">{children}</main>
          <Chat />
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
