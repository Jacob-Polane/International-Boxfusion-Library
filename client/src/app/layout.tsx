import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/authProvider";
import SearchProvider from "@/providers/searchProvider";
import RequestProvider from "@/providers/requestBookprovider";
import CommentProvider from "@/providers/commentProvider";
import InterestsProvider from "@/providers/InterestProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BIL",
  description: "Boxfusion International Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider> 
        <SearchProvider>
          <RequestProvider>
            <CommentProvider>
              <InterestsProvider>
              <body className={inter.className}>{children}</body>
              </InterestsProvider>
            </CommentProvider>
          </RequestProvider>
        </SearchProvider>
      </AuthProvider>
    </html>
  );
}
