
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, MapPin, Route, Map, User, Mail, Clock, Info } from 'lucide-react';
import { Brevet } from '@/data/brevets';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface EventDetailsModalProps {
  brevet: Brevet | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ brevet, isOpen, onClose }) => {
  if (!brevet) return null;

  const formattedDate = format(parseISO(brevet.date), 'EEEE, MMMM d, yyyy');

  // Choose color based on distance
  const getDistanceColor = (distance: number) => {
    if (distance <= 200) return 'bg-cycling-blue';
    if (distance <= 300) return 'bg-cycling-green';
    if (distance <= 400) return 'bg-cycling-purple';
    if (distance <= 600) return 'bg-cycling-orange';
    return 'bg-cycling-red';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold">{brevet.title}</DialogTitle>
            <div className={`${getDistanceColor(brevet.distance)} text-white font-bold py-1 px-4 rounded-full`}>
              {brevet.distance}k
            </div>
          </div>
          <DialogDescription className="text-lg">{brevet.organizer}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-cycling-blue flex-shrink-0" />
            <div>
              <div className="font-medium">{formattedDate}</div>
              <div className="text-sm text-muted-foreground">Start Time: {brevet.startTime}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-cycling-blue flex-shrink-0" />
            <div>
              <div className="font-medium">{brevet.startLocation}</div>
              <div className="text-sm text-muted-foreground">{brevet.city}, {brevet.state} {brevet.country}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-cycling-blue flex-shrink-0" />
            <div>
              <div className="font-medium">Time Limit: {brevet.timeLimit}</div>
              {brevet.elevation && (
                <div className="text-sm text-muted-foreground">Elevation: {brevet.elevation}m</div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-cycling-blue flex-shrink-0 mt-1" />
            <div>
              <div className="font-medium mb-1">Description</div>
              <div className="text-muted-foreground">{brevet.description}</div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-wrap gap-3">
            {brevet.contactEmail && (
              <div className="flex items-center gap-2 text-sm border rounded-full px-3 py-1">
                <Mail className="h-4 w-4 text-cycling-blue" />
                <span>{brevet.contactEmail}</span>
              </div>
            )}
            
            {brevet.route && (
              <div className="flex items-center gap-2 text-sm border rounded-full px-3 py-1">
                <Route className="h-4 w-4 text-cycling-blue" />
                <span>View Route</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            {brevet.registrationUrl && (
              <Button 
                className="bg-cycling-blue hover:bg-cycling-light-blue text-white"
                onClick={() => window.open(brevet.registrationUrl, '_blank')}
              >
                Register Now
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
