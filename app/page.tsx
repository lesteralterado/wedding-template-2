import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoupleMoment from "@/components/CoupleMoment";
import Story from "@/components/Story";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
import { IntroProvider } from "@/components/IntroGate";

export default function Home() {
  return (
    <IntroProvider>
      <main className="bg-background min-h-screen">
        <Navigation />
        <Hero />
        <CoupleMoment />
        <Story />
        <Events />
        <Gallery />
        <RSVP />
        <Footer />
      </main>
    </IntroProvider>
  );
}
