
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Award, Book } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-cycling-green/90 to-cycling-blue/90 text-white rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/62a3c193-2cdc-4799-a5ae-8574356cb7b4.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the World of Randonneuring</h1>
          <p className="text-xl mb-8">
            Challenge yourself with long-distance cycling events from 200km to 1200km.
            Join the global community of riders who embrace self-sufficiency, endurance, and adventure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="default" className="bg-white text-cycling-blue hover:bg-white/90">
              <Link to="/brevets">Find Events</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/how-to-participate">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
