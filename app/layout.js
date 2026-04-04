import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import MemberPopup from "@/components/MemberPopup";
import { CartProvider } from "@/context/CartContext";
import { getCollections } from "@/lib/shopify";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Elina Gold — Fine Jewelry",
  description: "Zeitlose Eleganz. Entdecke unsere handgefertigten Schmuck-Kollektionen.",
};

export default async function RootLayout({ children }) {
  let navCollections = [];
  try {
    const all = await getCollections();
    navCollections = all
      .filter((e) => e.node.handle !== "frontpage")
      .map((e) => ({ title: e.node.title, handle: e.node.handle }));
  } catch {}

  return (
    <html lang="de">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
          <Preloader />
          <CustomCursor />
          <Header collections={navCollections} />
          <CartDrawer />
          <MemberPopup />
          {children}
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
