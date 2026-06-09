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
                        <div className="flex items-center gap-2.5">
                            <Link
                                href="/"
                                className="text-ctp-text text-lg font-semibold tracking-tight no-underline"
                            >
                                Daniel Brooks
                            </Link>
                            <a
                                href="https://github.com/danielbusnz-lgtm"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="no-underline"
                                style={{ color: "#ea999c" }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                            </a>
                        </div>
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
