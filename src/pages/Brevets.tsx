
import React, { useState } from 'react';
import { brevets } from '@/data/brevets';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCard from '@/components/BrevetsCard';
import BrevetsCalendar from '@/components/BrevetsCalendar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ListFilter, CalendarIcon, ListIcon } from 'lucide-react';

const Brevets = () => {
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('calendar');
  const [filter, setFilter] = useState({
    distance: [] as string[],
    location: '' as string,
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  const filteredBrevets = brevets.filter(brevet => {
    // Filter by distance
    if (filter.distance.length > 0 && !filter.distance.includes(String(brevet.distance))) {
      return false;
    }

    // Filter by location
    if (filter.location && 
      !brevet.city.toLowerCase().includes(filter.location.toLowerCase()) &&
      !brevet.state.toLowerCase().includes(filter.location.toLowerCase()) &&
      !brevet.country.toLowerCase().includes(filter.location.toLowerCase())) {
      return false;
    }

    // Filter by date range
    if (filter.startDate && new Date(brevet.date) < filter.startDate) {
      return false;
    }
    if (filter.endDate && new Date(brevet.date) > filter.endDate) {
      return false;
    }

    return true;
  });

  const handleSelect = (brevetId: string) => {
    // Handle brevet selection
    console.log("Selected brevet:", brevetId);
    // Future implementation: show details modal or navigate to details page
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-cycling-blue">Brevets Calendar</h1>
        <p className="text-muted-foreground">
          Find and register for upcoming brevet events from 200km to 1200km
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <ListFilter size={18} />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="calendar" value={currentView} onValueChange={(v) => setCurrentView(v as 'calendar' | 'list')}>
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon size={16} />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <ListIcon size={16} />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {showFilters && (
        <div className="mb-6">
          <BrevetsFilters filter={filter} setFilter={setFilter} />
        </div>
      )}

      <Tabs defaultValue="calendar" value={currentView} className="w-full">
        <TabsContent value="calendar" className="mt-0">
          <BrevetsCalendar brevets={filteredBrevets} onSelect={handleSelect} />
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrevets.map(brevet => (
              <BrevetsCard 
                key={brevet.id} 
                brevet={brevet}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Brevets;
