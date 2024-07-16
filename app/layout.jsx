import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Billito",
  description: "Book your flight now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
