
import React from 'react';
import { Calendar, MapPin, Route } from 'lucide-react';
import { format } from 'date-fns';
import { Brevet } from '@/data/brevets';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BrevetsCardProps {
  brevet: Brevet;
  onSelect: (brevet: Brevet) => void;
}

const BrevetsCard: React.FC<BrevetsCardProps> = ({ brevet, onSelect }) => {
  const formattedDate = format(new Date(brevet.date), 'MMMM d, yyyy');
  
  // Choose color based on distance
  const getDistanceColor = (distance: number) => {
    if (distance <= 200) return 'bg-cycling-blue';
    if (distance <= 300) return 'bg-cycling-green';
    if (distance <= 400) return 'bg-cycling-purple';
    if (distance <= 600) return 'bg-cycling-orange';
    return 'bg-cycling-red';
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{brevet.title}</CardTitle>
            <CardDescription className="font-medium">{brevet.organizer}</CardDescription>
          </div>
          <div className={`${getDistanceColor(brevet.distance)} text-white text-sm font-bold py-1 px-3 rounded-full`}>
            {brevet.distance}k
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-cycling-blue" />
            <span>{formattedDate} • {brevet.startTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-cycling-blue" />
            <span>{brevet.startLocation}, {brevet.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Route className="h-4 w-4 text-cycling-blue" />
            <span>Time limit: {brevet.timeLimit}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full border-cycling-blue text-cycling-blue hover:bg-cycling-blue hover:text-white"
          onClick={() => onSelect(brevet)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrevetsCard;
