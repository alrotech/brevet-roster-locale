
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { format, parseISO, isAfter, isBefore, isSameDay } from 'date-fns';
import { brevets, uniqueCities, distanceOptions } from '@/data/brevets';
import BrevetsFilters from '@/components/BrevetsFilters';
import BrevetsCalendar from '@/components/BrevetsCalendar';
import CalendarHeader from '@/components/CalendarHeader';
import BrevetsCard from '@/components/BrevetsCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const Brevets = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCity, setSelectedCity] = useState('all_cities');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  
  // Filter brevets based on selected filters
  const filteredBrevets = brevets.filter(brevet => {
    const brevetDate = parseISO(brevet.date);
    
    // City filter
    if (selectedCity !== 'all_cities' && brevet.city !== selectedCity) {
      return false;
    }
    
    // Date range filter
    if (startDate && isBefore(brevetDate, startDate)) {
      return false;
    }
    if (endDate && isAfter(brevetDate, endDate)) {
      return false;
    }
    
    // Distance filter
    if (selectedDistance && brevet.distance !== selectedDistance) {
      return false;
    }
    
    // Selected date filter
    if (selectedDate && !isSameDay(brevetDate, selectedDate)) {
      return false;
    }
    
    return true;
  }).sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  const resetFilters = () => {
    setSelectedCity('all_cities');
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedDistance(null);
    setSelectedDate(null);
  };
  
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
        <h1 className="text-4xl font-bold text-cycling-blue">Brevets</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Find and register for official randonneuring events
        </p>
      </header>
      
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6">
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
        
        {/* View Mode Selector */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list')} className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="calendar" className="space-y-6">
            {/* Calendar View */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <CalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
              <BrevetsCalendar 
                brevets={brevets}
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>

            {/* Filtered Events for Calendar View */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {selectedDate ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` : 
                filteredBrevets.length > 0 ? 'Filtered Events' : 'No events found'}
              </h2>
              
              {filteredBrevets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBrevets.map((brevet) => (
                    <BrevetsCard key={brevet.id} brevet={brevet} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <p className="text-muted-foreground">No events match your filters.</p>
                  <Button onClick={resetFilters} variant="outline" className="mt-4">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            {/* List View */}
            <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
              {filteredBrevets.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Start Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBrevets.map((brevet) => (
                      <TableRow key={brevet.id}>
                        <TableCell>{format(parseISO(brevet.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="font-medium">{brevet.title}</TableCell>
                        <TableCell>{brevet.distance}k</TableCell>
                        <TableCell>{brevet.city}</TableCell>
                        <TableCell>{brevet.startTime}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium 
                            ${isAfter(parseISO(brevet.date), new Date()) ? 
                              'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            {isAfter(parseISO(brevet.date), new Date()) ? 'Upcoming' : 'Past'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" onClick={() => navigate(`/events/${brevet.id}`)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events match your filters.</p>
                  <Button onClick={resetFilters} variant="outline" className="mt-4">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Brevets;
