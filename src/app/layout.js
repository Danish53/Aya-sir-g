import { Poppins, Geist, Geist_Mono } from "next/font/google";
import AosWrapper from "./components/AosWrapper";
import SiteChrome from "./SiteChrome";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"], // remove any other implicit ranges
  variable: "--font-poppins",
});


export const metadata = {
  title: "Aya Sir G!",
  description: "Aya Sir G! The official site.",
  icons: {
    icon: "/logo_header.png",
    apple: "/logo_header.png",
  },
  openGraph: {
    title: "Aya Sir G!",
    description: "Aya Sir G! The official site.",
    url: "https://ayasirg.com",
    siteName: "Aya Sir G!",
    images: [
      {
        url: "https://ayasirg.com/logo_header.png",
        width: 1200,
        height: 630,
        alt: "Aya Sir G Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aya Sir G!",
    description: "Aya Sir G! The official site.",
    images: ["https://ayasirg.com/logo_header.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" type="image/png" href="/logo_header.png" />
        <link rel="apple-touch-icon" href="/logo_header.png" />

        <meta property="og:title" content="Aya Sir G!" />
        <meta property="og:description" content="Aya Sir G! The official site." />
        <meta property="og:image" content="https://ayasirg.com/logo_header.png" />
        <meta property="og:url" content="https://ayasirg.com/" />
        <meta property="og:type" content="website" />
      </head> */}
      <body className={poppins.variable}>
        <UserProvider>
          <AosWrapper>
            <SiteChrome position="top" />
            {children}
            <SiteChrome position="bottom" />
            <ToastContainer />
          </AosWrapper>
        </UserProvider>
      </body>
    </html>
  );
}

