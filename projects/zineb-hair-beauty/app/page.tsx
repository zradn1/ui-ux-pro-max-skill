import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import BookingBar from "@/components/BookingBar";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <Services />
        <About />
        <Gallery />
        <BeforeAfter />
        <Testimonials />
        <Visit />
        <CallToAction />
      </main>
      <Footer />
      <BookingBar />
    </>
  );
}
