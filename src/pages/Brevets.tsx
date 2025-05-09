
import React, { useState } from 'react';
import { brevets, distanceOptions } from '@/data/brevets';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCard from '@/components/BrevetsCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ListFilter, CalendarIcon, ListIcon } from 'lucide-react';
import { format, parseISO, startOfMonth } from 'date-fns';

const Brevets = () => {
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('list');
  const [selectedCity, setSelectedCity] = useState('all_cities');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  const filteredBrevets = brevets.filter(brevet => {
    // Filter by distance
    if (selectedDistance && brevet.distance !== selectedDistance) {
      return false;
    }

    // Filter by location
    if (selectedCity && selectedCity !== 'all_cities' && 
      !brevet.city.toLowerCase().includes(selectedCity.toLowerCase()) &&
      !brevet.state.toLowerCase().includes(selectedCity.toLowerCase()) &&
      !brevet.country.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }

    // Filter by date range
    if (startDate && new Date(brevet.date) < startDate) {
      return false;
    }
    if (endDate && new Date(brevet.date) > endDate) {
      return false;
    }

    // Filter by selected date
    if (selectedDate && !format(parseISO(brevet.date), 'yyyy-MM-dd').includes(format(selectedDate, 'yyyy-MM-dd'))) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedCity('all_cities');
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedDistance(null);
    setSelectedDate(null);
  };

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

        <Tabs defaultValue="list" value={currentView} onValueChange={(v) => setCurrentView(v as 'calendar' | 'list')}>
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
          <BrevetsFilters 
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedDistance={selectedDistance}
            setSelectedDistance={setSelectedDistance}
            resetFilters={resetFilters}
          />
        </div>
      )}

      <Tabs defaultValue="list" value={currentView} className="w-full">
        <TabsContent value="calendar" className="mt-0">
          {/* We need to update this component or import it if available */}
          <div className="bg-white p-4 rounded-lg">
            <p>Calendar view is in development.</p>
            <p>Selected events: {filteredBrevets.length}</p>
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrevets.map(brevet => (
              <BrevetsCard 
                key={brevet.id} 
                brevet={brevet}
                onSelect={() => handleSelect(brevet.id)}
              />
            ))}
            
            {filteredBrevets.length === 0 && (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">No events found matching your filters.</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters} 
                  className="mt-2"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Brevets;
