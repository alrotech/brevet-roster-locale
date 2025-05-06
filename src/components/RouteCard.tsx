
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Route } from '@/data/routes';
import { Badge } from '@/components/ui/badge';
import { Distance, Flag, MapPin, ExternalLink } from 'lucide-react';

interface RouteCardProps {
  route: Route;
  onViewDetails: (route: Route) => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onViewDetails }) => {
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

  const getShortDescription = (desc?: string) => {
    if (!desc) return '';
    return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div 
        className="w-full h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${route.imageUrl || '/placeholder.svg'})` }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-cycling-blue">{route.name}</CardTitle>
          <Badge className={`${difficultyColor()} ml-2`}>
            {route.difficulty}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <Distance className="h-4 w-4" /> 
          <span>{route.distance}km</span>
          {route.elevation && (
            <span className="ml-2">↗ {route.elevation}m</span>
          )}
        </div>
        <CardDescription className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {route.startPoint}{route.startPoint !== route.endPoint ? ` → ${route.endPoint}` : ' (loop)'}
            </span>
          </div>
          {route.terrain && (
            <div className="text-sm text-muted-foreground">
              Terrain: {route.terrain}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {getShortDescription(route.description)}
        </p>
        
        {route.eventIds && route.eventIds.length > 0 && (
          <div className="mt-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {route.eventIds.length} {route.eventIds.length === 1 ? 'event' : 'events'} scheduled
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(route)}>
          View Details
        </Button>
        
        {route.originalEventId && (
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/brevets?event=${route.originalEventId}`} className="flex items-center gap-1">
              <Flag className="h-4 w-4" />
              <span>Original Event</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RouteCard;
