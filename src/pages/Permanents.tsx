
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Route, Calendar, MapPin, Book } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

// Permanent event data (mock)
const permanentEvents = [
  {
    id: 'p1',
    title: 'Minsk Permanent',
    distance: 200,
    routes: ['Minsk - Zaslavl - Minsk', 'Minsk - Rakov - Minsk'],
    description: 'Classic Minsk permanent event',
    finishers: 24
  },
  {
    id: 'p2',
    title: 'Brest Permanent',
    distance: 300,
    routes: ['Brest - Kobrin - Brest', 'Brest - Pruzhany - Brest'],
    description: 'Scenic routes around Brest region',
    finishers: 16
  },
  {
    id: 'p3',
    title: 'Grodno Permanent',
    distance: 400,
    routes: ['Grodno - Lida - Grodno', 'Grodno - Mosty - Grodno'],
    description: 'Historical routes through western Belarus',
    finishers: 8
  },
  {
    id: 'p4',
    title: 'Vitebsk Permanent',
    distance: 600,
    routes: ['Vitebsk - Polotsk - Vitebsk', 'Vitebsk - Gorodok - Vitebsk'],
    description: 'Challenging northern routes',
    finishers: 5
  }
];

const Permanents = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-cycling-blue">Permanents</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Ride anytime routes that count toward randonneuring awards
        </p>
      </header>
      
      {/* Rules Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <Book className="h-8 w-8 text-cycling-blue flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-cycling-blue mb-4">Permanent Rules</h2>
            <div className="space-y-4">
              <p>
                Permanent events (or "permanents") are pre-approved routes that can be ridden at any time
                by registered randonneurs. Unlike regular brevets that happen on specific dates, permanents
                offer flexibility to ride official routes whenever it suits you.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Permanents can be ridden on any day of the year, weather permitting.</li>
                <li>You must register your intent to ride a permanent at least 24 hours in advance.</li>
                <li>All standard randonneuring rules apply (lighting, self-sufficiency, etc.).</li>
                <li>Completion of permanents counts toward various randonneuring awards and challenges.</li>
                <li>Each permanent requires evidence of completion through control points or GPS tracking.</li>
                <li>Results must be submitted within 7 days of completion for validation.</li>
              </ul>
              <p className="italic text-muted-foreground">
                Note: Complete rules and regulations are available in the Randonneur handbook.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Permanent Events Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-cycling-blue mb-6">Available Permanent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permanentEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <span className="bg-cycling-green text-white text-sm font-semibold px-2.5 py-1 rounded-full">
                    {event.distance}k
                  </span>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Route className="h-4 w-4 text-cycling-blue mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Available Routes:</p>
                      <ul className="list-disc pl-5 text-sm">
                        {event.routes.map((route, index) => (
                          <li key={index}>{route}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-cycling-blue flex-shrink-0" />
                    <span>{event.routes[0].split(' - ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-cycling-blue flex-shrink-0" />
                    <span>Available year-round</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {event.finishers} completions
                </span>
                <Button size="sm" onClick={() => navigate(`/permanents/${event.id}`)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Permanents;
