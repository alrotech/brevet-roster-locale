
import React, { useState, useEffect } from 'react';
import { format, parseISO, isAfter, isBefore, isSameDay } from 'date-fns';
import { Brevet, brevets } from '@/data/brevets';
import CalendarHeader from '@/components/CalendarHeader';
import BrevetsCalendar from '@/components/BrevetsCalendar';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCard from '@/components/BrevetsCard';
import EventDetailsModal from '@/components/EventDetailsModal';

const Index = () => {
  // State for filters
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // State for filtered brevets
  const [filteredBrevets, setFilteredBrevets] = useState<Brevet[]>(brevets);
  
  // State for event modal
  const [selectedBrevet, setSelectedBrevet] = useState<Brevet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply filters
  useEffect(() => {
    let filtered = [...brevets];
    
    // Filter by city
    if (selectedCity) {
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
    setSelectedCity('');
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
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
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-cycling-blue">
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
              <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-1">
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
        </div>
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
