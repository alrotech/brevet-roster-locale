
import { brevets, distanceOptions } from '@/data/brevets';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCard from '@/components/BrevetsCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ListFilter, CalendarIcon, ListIcon } from 'lucide-react';
import { format, parseISO, startOfMonth } from 'date-fns';

export default function BrevetsPage() {
  // Note: Since this is a static site, we need to move state-related logic to client components
  // For now, we'll just pass the unfiltered data to be handled by client components
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-cycling-blue">Brevets Calendar</h1>
        <p className="text-muted-foreground">
          Find and register for upcoming brevet events from 200km to 1200km
        </p>
      </div>

      {/* We would replace the interactivity with client components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brevets.map(brevet => (
          <BrevetsCard 
            key={brevet.id} 
            brevet={brevet}
            onSelect={() => console.log("Selected brevet:", brevet.id)}
          />
        ))}
      </div>
    </div>
  );
}
