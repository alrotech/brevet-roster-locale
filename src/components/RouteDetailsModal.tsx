
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Route } from '@/data/routes';
import { Badge } from '@/components/ui/badge';
import { Flag, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface RouteDetailsModalProps {
  route: Route | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({ route, isOpen, onOpenChange }) => {
  if (!route) return null;

  const difficultyColor = () => {
    switch (route.difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-blue-100 text-blue-800';
      case 'Challenging': return 'bg-yellow-100 text-yellow-800';
      case 'Difficult': return 'bg-orange-100 text-orange-800';
      case 'Extreme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-cycling-blue text-2xl">{route.name}</span>
            <Badge className={difficultyColor()}>
              {route.difficulty}
            </Badge>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-base pt-1">
            <span className="font-medium">{route.distance}km</span>
            {route.elevation && (
              <span className="ml-2">↗ {route.elevation}m</span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {route.imageUrl && (
            <div className="w-full h-64 rounded-md overflow-hidden">
              <img 
                src={route.imageUrl} 
                alt={route.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Route Details</h3>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>Start:</strong> {route.startPoint}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>End:</strong> {route.endPoint}
                </span>
              </div>
              {route.terrain && (
                <div className="flex items-start gap-2">
                  <span className="font-medium">Terrain:</span>
                  <span>{route.terrain}</span>
                </div>
              )}
              {route.createdAt && (
                <div className="flex items-start gap-2">
                  <span className="font-medium">Added:</span>
                  <span>{formatDate(route.createdAt)}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Associated Events</h3>
              {route.eventIds && route.eventIds.length > 0 ? (
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {route.eventIds.length} {route.eventIds.length === 1 ? 'event' : 'events'} scheduled
                  </Badge>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/brevets?routeId=${route.id}`} className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>View Events</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming events for this route.</p>
              )}
              
              {route.originalEventId && (
                <>
                  <Separator className="my-2" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Original Event</h3>
                    <Button variant="ghost" size="sm" className="mt-1 pl-0" asChild>
                      <Link to={`/brevets?event=${route.originalEventId}`} className="flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" />
                        <span>View Original Event</span>
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <p className="text-sm">{route.description || "No description available."}</p>
          </div>
          
          <div className="flex justify-end pt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteDetailsModal;
