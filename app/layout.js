import { Inter } from "next/font/google";
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
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            enableSystem
            defaultTheme="system"
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
              {children}
            </main>
            <Chat />
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
