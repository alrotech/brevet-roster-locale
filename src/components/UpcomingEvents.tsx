
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brevet } from '@/data/brevets';

type UpcomingEventsProps = {
  events: Brevet[];
};

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  // Show only the next 4 events
  const upcomingEvents = events.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cycling-blue">Upcoming Events</h2>
        <Link to="/brevets">
          <Button variant="ghost" className="text-cycling-blue hover:text-cycling-blue/80">
            See full calendar →
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden border-t-4 border-t-cycling-orange">
            <CardContent className="p-4">
              <div className="mb-3">
                <Badge className="bg-cycling-orange mb-2">{event.distance}km</Badge>
                <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
              </div>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(parseISO(event.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.city}</span>
                </div>
              </div>
              
              <Button asChild className="w-full" variant="outline">
                <Link to={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
