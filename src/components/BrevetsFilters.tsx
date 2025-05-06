
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { distanceOptions, uniqueCities } from '@/data/brevets';

interface FiltersProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  selectedDistance: number | null;
  setSelectedDistance: (distance: number | null) => void;
  resetFilters: () => void;
}

const BrevetsFilters: React.FC<FiltersProps> = ({
  selectedCity,
  setSelectedCity,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedDistance,
  setSelectedDistance,
  resetFilters
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Find Brevets</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* City Filter */}
        <div className="space-y-2">
          <Label htmlFor="city-filter">City</Label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger id="city-filter">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_cities">All cities</SelectItem>
              {uniqueCities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Date Filter */}
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date Filter */}
        <div className="space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) => startDate ? date < startDate : false}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <Label htmlFor="distance-filter">Distance</Label>
          <Select 
            value={selectedDistance ? selectedDistance.toString() : "all_distances"}
            onValueChange={(value) => setSelectedDistance(value === "all_distances" ? null : parseInt(value))}
          >
            <SelectTrigger id="distance-filter">
              <SelectValue placeholder="All distances" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_distances">All distances</SelectItem>
              {distanceOptions.map((distance) => (
                <SelectItem key={distance} value={distance.toString()}>{distance}k</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="text-cycling-blue"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default BrevetsFilters;
