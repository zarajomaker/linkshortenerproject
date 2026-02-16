import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { SignInButtonComponent, SignUpButtonComponent } from "@/components/auth-buttons";
import { Link2 } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Shortener - Shorten Links, Amplify Your Reach",
  description: "Create short, memorable links that are easy to share. Track performance, manage your links, and gain insights with powerful analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="antialiased">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Link2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Link Shortener</span>
              </div>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButtonComponent />
                  <SignUpButtonComponent />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
