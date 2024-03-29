import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";
import Main from "./main/page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Main />
      <Footer />
    </main>
  );
}
