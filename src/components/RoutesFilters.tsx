
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface RoutesFiltersProps {
  onFilterChange: (filters: RouteFilters) => void;
  className?: string;
}

export interface RouteFilters {
  searchTerm: string;
  distance: [number, number]; // min, max
  difficulty: string | null;
  hasEvents: boolean | null;
}

const RoutesFilters = ({ onFilterChange, className }: RoutesFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [distance, setDistance] = useState<[number, number]>([0, 1500]); // min, max in km
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [hasEvents, setHasEvents] = useState<boolean | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    applyFilters(newSearchTerm, distance, difficulty, hasEvents);
  };

  const handleDistanceChange = (value: number[]) => {
    const newDistance: [number, number] = [value[0], value[1]];
    setDistance(newDistance);
    applyFilters(searchTerm, newDistance, difficulty, hasEvents);
  };

  const handleDifficultyChange = (value: string) => {
    const newDifficulty = value === difficulty ? null : value;
    setDifficulty(newDifficulty);
    applyFilters(searchTerm, distance, newDifficulty, hasEvents);
  };

  const handleEventsChange = (value: string) => {
    let newHasEvents: boolean | null;
    if (value === 'all') newHasEvents = null;
    else if (value === 'with') newHasEvents = true;
    else newHasEvents = false;
    
    setHasEvents(newHasEvents);
    applyFilters(searchTerm, distance, difficulty, newHasEvents);
  };

  const applyFilters = (
    search: string,
    dist: [number, number],
    diff: string | null,
    events: boolean | null
  ) => {
    onFilterChange({
      searchTerm: search,
      distance: dist,
      difficulty: diff,
      hasEvents: events,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDistance([0, 1500]);
    setDifficulty(null);
    setHasEvents(null);
    applyFilters('', [0, 1500], null, null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <Input
          placeholder="Search routes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Distance Range ({distance[0]} - {distance[1]} km)</Label>
        <Slider
          min={0}
          max={1500}
          step={50}
          value={[distance[0], distance[1]]}
          onValueChange={handleDistanceChange}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <Label>Difficulty</Label>
        <div className="flex flex-wrap gap-2">
          {["Easy", "Moderate", "Challenging", "Difficult", "Extreme"].map((level) => (
            <Button
              key={level}
              variant={difficulty === level ? "default" : "outline"}
              size="sm"
              onClick={() => handleDifficultyChange(level)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Event Status</Label>
        <RadioGroup defaultValue="all" className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" checked={hasEvents === null} onClick={() => handleEventsChange('all')} />
            <Label htmlFor="all">All routes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="with" id="with" checked={hasEvents === true} onClick={() => handleEventsChange('with')} />
            <Label htmlFor="with">With upcoming events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="without" id="without" checked={hasEvents === false} onClick={() => handleEventsChange('without')} />
            <Label htmlFor="without">Without events</Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear Filters
      </Button>
    </div>
  );
};

export default RoutesFilters;
