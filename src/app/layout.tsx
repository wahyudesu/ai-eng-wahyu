import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "AI Engineering - Best Resources & Engineers for Building AI Applications",
    template: "%s | AI Engineering",
  },
  description:
    "Discover the best AI engineers, courses, jobs, tools, and resources for building intelligent applications with LLMs, machine learning, and AI infrastructure.",
  keywords: [
    "AI engineering",
    "machine learning",
    "LLM",
    "AI jobs",
    "AI courses",
    "prompt engineering",
    "AI tools",
  ],
  authors: [{ name: "Wahyu Iqbal" }],
  creator: "Wahyu Iqbal",
  metadataBase: new URL("https://aieng.wahyuikbal.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aieng.wahyuikbal.com",
    title:
      "AI Engineering - Best Resources & Engineers for Building AI Applications",
    description:
      "Discover the best AI engineers, courses, jobs, tools, and resources for building intelligent applications with LLMs, machine learning, and AI infrastructure.",
    siteName: "AI Engineering",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Engineering - Best Resources & Engineers for Building AI Applications",
    description:
      "Discover the best AI engineers, courses, jobs, tools, and resources for building intelligent applications with LLMs, machine learning, and AI infrastructure.",
    creator: "@wahyudesu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="198b8bcd-4aaa-42f3-90bc-9cdfb188d78a"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-geist-sans antialiased bg-background text-foreground transition-colors duration-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
