import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { PostTree } from "@/components/post-tree";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://danielbusnz.com"),
    title: {
        default: "Daniel Brooks",
        template: "%s · Daniel Brooks",
    },
    description: "What im building rn https://github.com/danielbusnz-lgtm/Peeky.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full lg:flex">
                <aside className="w-full shrink-0 overflow-y-auto px-6 py-6 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:px-4 lg:py-8">
                    <PostTree />
                </aside>
                <div className="flex min-h-screen flex-1 flex-col">
                    <header className="mx-auto w-full max-w-2xl px-6 pt-12 pb-6">
                        <Link
                            href="/"
                            className="text-ctp-text text-lg font-semibold tracking-tight no-underline"
                        >
                            Daniel Brooks
                        </Link>
                        <p
                            className="mt-1 text-sm font-medium"
                            style={{ color: "var(--ctp-yellow)" }}
                        >
                            Software Engineer
                        </p>
                        <p className="mt-1 text-sm text-ctp-subtext0">
                            Daily notes on what I&apos;m building.
                        </p>
                    </header>
                    <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-24">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
