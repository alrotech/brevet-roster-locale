import React, { useState, useEffect } from 'react';
import { format, parseISO, isAfter, isBefore, isSameDay } from 'date-fns';
import { Brevet, brevets, uniqueYears } from '@/data/brevets';
import CalendarHeader from '@/components/CalendarHeader';
import BrevetsCalendar from '@/components/BrevetsCalendar';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCard from '@/components/BrevetsCard';
import EventDetailsModal from '@/components/EventDetailsModal';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ITEMS_PER_PAGE = 6; // Number of cards per page

const Index = () => {
  // State for filters
  const [selectedCity, setSelectedCity] = useState('all_cities');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // State for filtered brevets
  const [filteredBrevets, setFilteredBrevets] = useState<Brevet[]>(brevets);
  
  // State for event modal
  const [selectedBrevet, setSelectedBrevet] = useState<Brevet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBrevets, setPaginatedBrevets] = useState<Brevet[]>([]);
  const [totalPages, setTotalPages] = useState(1);

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

    // Filter by selected year
    if (selectedYear && selectedYear !== 'all_years') {
      const year = parseInt(selectedYear);
      filtered = filtered.filter(brevet => 
        new Date(brevet.date).getFullYear() === year
      );
    }
    
    // Sort by date
    filtered = filtered.sort((a, b) => 
      parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );
    
    setFilteredBrevets(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCity, startDate, endDate, selectedDistance, selectedDate, selectedYear]);

  // Apply pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedBrevets(filteredBrevets.slice(startIndex, endIndex));
  }, [filteredBrevets, currentPage]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCity('all_cities');
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedDistance(null);
    setSelectedDate(null);
    setSelectedYear(new Date().getFullYear().toString());
    setCurrentPage(1);
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

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-cycling-blue">Brevet Calendar</h1>
        <p className="text-lg text-muted-foreground mt-2">Find and register for randonneuring events near you</p>
      </header>

      <div className="p-4 bg-white shadow rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Find Brevets</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Year Filter */}
          <div className="space-y-2">
            <Label htmlFor="year-filter">Year</Label>
            <Select 
              value={selectedYear} 
              onValueChange={setSelectedYear}
            >
              <SelectTrigger id="year-filter">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_years">All years</SelectItem>
                {uniqueYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Rest of the filters */}
          <div className="md:col-span-4">
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
        </div>
      </div>

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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedBrevets.map(brevet => (
                  <BrevetsCard 
                    key={brevet.id} 
                    brevet={brevet}
                    onSelect={handleBrevetsSelect}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {renderPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
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
