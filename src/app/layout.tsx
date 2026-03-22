import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AI Engineering",
  url: "https://aieng.wahyuikbal.com",
  description:
    "Discover the best AI engineers, courses, jobs, tools, and resources for building intelligent applications with LLMs, machine learning, and AI infrastructure.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aieng.wahyuikbal.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "AI Engineering",
    url: "https://aieng.wahyuikbal.com",
    logo: {
      "@type": "ImageObject",
      url: "https://aieng.wahyuikbal.com/favicon.svg",
    },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Engineering",
  url: "https://aieng.wahyuikbal.com",
  description:
    "Curated resources for AI engineers, including job opportunities, courses, tools, and expert recommendations.",
  logo: "https://aieng.wahyuikbal.com/favicon.svg",
  sameAs: ["https://twitter.com/wahyudesu"],
  founder: {
    "@type": "Person",
    name: "Wahyu Iqbal",
  },
};

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
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
        <link rel="icon" href="/icon" sizes="512x512" type="image/png"></link>
        <link
          rel="apple-touch-icon"
          href="/apple-icon"
          sizes="180x180"
          type="image/png"
        ></link>
        <link rel="manifest" href="/manifest.json"></link>
        <meta name="theme-color" content="#667eea"></meta>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
        <script
          defer
          src="https://umami-personal-web-analytics.vercel.app/script.js"
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
