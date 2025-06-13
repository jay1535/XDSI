import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { Pricing } from '@/components/pricing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}