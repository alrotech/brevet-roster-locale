
import React, { useState, useEffect } from 'react';
import { format, parseISO, isAfter, isBefore, isSameDay } from 'date-fns';
import { Brevet, brevets } from '@/data/brevets';
import CalendarHeader from '@/components/CalendarHeader';
import BrevetsCalendar from '@/components/BrevetsCalendar';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCard from '@/components/BrevetsCard';
import EventDetailsModal from '@/components/EventDetailsModal';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Index = () => {
  // State for filters
  const [selectedCity, setSelectedCity] = useState('all_cities');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // State for filtered brevets
  const [filteredBrevets, setFilteredBrevets] = useState<Brevet[]>(brevets);
  
  // State for event modal
  const [selectedBrevet, setSelectedBrevet] = useState<Brevet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply filters
  useEffect(() => {
    let filtered = [...brevets];
    
    // Filter by city
    if (selectedCity && selectedCity !== 'all_cities') {
      filtered = filtered.filter(brevet => brevet.city === selectedCity);
    }
    
    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(brevet => 
        isAfter(parseISO(brevet.date), startDate) || 
        isSameDay(parseISO(brevet.date), startDate)
      );
    }
    
    if (endDate) {
      filtered = filtered.filter(brevet => 
        isBefore(parseISO(brevet.date), endDate) ||
        isSameDay(parseISO(brevet.date), endDate)
      );
    }
    
    // Filter by distance
    if (selectedDistance) {
      filtered = filtered.filter(brevet => brevet.distance === selectedDistance);
    }
    
    // Filter by selected calendar date
    if (selectedDate) {
      filtered = filtered.filter(brevet => 
        isSameDay(parseISO(brevet.date), selectedDate)
      );
    }
    
    // Sort by date
    filtered = filtered.sort((a, b) => 
      parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );
    
    setFilteredBrevets(filtered);
  }, [selectedCity, startDate, endDate, selectedDistance, selectedDate]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCity('all_cities');
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedDistance(null);
    setSelectedDate(null);
  };

  // Handle opening event details modal
  const handleBrevetsSelect = (brevet: Brevet) => {
    setSelectedBrevet(brevet);
    setIsModalOpen(true);
  };

  // Handle closing event details modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-cycling-blue">Brevet Calendar</h1>
        <p className="text-lg text-muted-foreground mt-2">Find and register for randonneuring events near you</p>
      </header>

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

      {/* Main content container */}
      <div className="space-y-6">
        {/* Events list - now the main focus */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-cycling-blue">
            {selectedDate 
              ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` 
              : 'Upcoming Brevets'}
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            {filteredBrevets.length} events found
          </p>
          
          {filteredBrevets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No events found matching your criteria.
              <br />
              <button 
                onClick={resetFilters}
                className="text-cycling-blue underline mt-2"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrevets.map(brevet => (
                <BrevetsCard 
                  key={brevet.id} 
                  brevet={brevet}
                  onSelect={handleBrevetsSelect}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Calendar toggle button */}
        <div className="flex justify-center">
          <Button 
            onClick={toggleCalendar} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            {showCalendar ? (
              <>
                Hide Calendar <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show Calendar <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        
        {/* Collapsible calendar section */}
        {showCalendar && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <CalendarHeader 
              currentMonth={currentMonth} 
              setCurrentMonth={setCurrentMonth} 
            />
            <BrevetsCalendar
              brevets={brevets}
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        )}
      </div>

      <EventDetailsModal 
        brevet={selectedBrevet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
