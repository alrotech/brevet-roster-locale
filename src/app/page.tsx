
import HeroBanner from '@/components/HeroBanner';
import QuickLinks from '@/components/QuickLinks';
import UpcomingEvents from '@/components/UpcomingEvents';
import ShortRules from '@/components/ShortRules';
import Footer from '@/components/Footer';
import { brevets } from '@/data/brevets';
import { isAfter, isBefore, parseISO, isSameDay } from 'date-fns';

export default function Home() {
  // Filter upcoming events and sort by date
  const upcomingEvents = brevets
    .filter(brevet => isAfter(parseISO(brevet.date), new Date()) || 
                      isSameDay(parseISO(brevet.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  return (
    <div>
      <div className="container mx-auto p-4 max-w-7xl mt-4 space-y-12">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Quick Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-cycling-blue">Quick Links</h2>
          <QuickLinks />
        </section>
        
        {/* Upcoming Events */}
        <section>
          <UpcomingEvents events={upcomingEvents} />
        </section>
        
        {/* Short Rules */}
        <section>
          <ShortRules />
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
