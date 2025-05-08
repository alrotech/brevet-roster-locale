
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, User, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  getEventResultsById, 
  formatTime 
} from '@/data/results';
import { brevets } from '@/data/brevets';

const EventResults = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'time' | 'name'>('time');
  
  // Get event details - first try from results, then from brevets
  const eventResults = eventId ? getEventResultsById(eventId) : null;
  const brevetEvent = eventId ? brevets.find(b => b.id === eventId) : null;
  
  const event = eventResults ? {
    id: eventResults.eventId,
    title: eventResults.eventName,
    date: eventResults.date,
    distance: eventResults.distance
  } : brevetEvent ? {
    id: brevetEvent.id,
    title: brevetEvent.title,
    date: brevetEvent.date,
    distance: brevetEvent.distance
  } : null;
  
  if (!event) {
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
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center py-8">Event not found.</p>
        </div>
      </div>
    );
  }
  
  // Sort results if available
  const sortedResults = eventResults?.results.slice() || [];
  if (sortBy === 'time') {
    sortedResults.sort((a, b) => {
      if (a.result.status !== "Finished") return 1;
      if (b.result.status !== "Finished") return -1;
      return (a.result.totalTime || Infinity) - (b.result.totalTime || Infinity);
    });
  } else {
    sortedResults.sort((a, b) => a.participant.name.localeCompare(b.participant.name));
  }
  
  // Function to determine status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Finished': return <Badge className="bg-cycling-green text-white">Finished</Badge>;
      case 'DNF': return <Badge variant="destructive">DNF</Badge>;
      case 'DNS': return <Badge variant="outline" className="text-muted-foreground">DNS</Badge>;
      case 'OTL': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">OTL</Badge>;
      case 'DQ': return <Badge variant="destructive">DQ</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
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
      
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-cycling-blue">{event.title} Results</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{event.distance}km</span>
          </div>
        </div>
      </header>
      
      {!eventResults && (
        <Card>
          <CardHeader>
            <CardTitle>Results Not Available</CardTitle>
            <CardDescription>
              The results for this event have not been published yet.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      
      {eventResults && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant={sortBy === 'time' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setSortBy('time')}
              >
                Sort by Time
              </Button>
              <Button
                variant={sortBy === 'name' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setSortBy('name')}
              >
                Sort by Name
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Place</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Club</TableHead>
                    {eventResults.controlPoints.slice(1).map((cp) => (
                      <TableHead key={cp.id} className="text-center whitespace-nowrap">
                        {cp.name} ({cp.distance}km)
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Total Time</TableHead>
                    <TableHead className="text-right">Avg Speed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedResults.map((result, index) => {
                    const isFinished = result.result.status === 'Finished';
                    // Only show place number for finishers
                    const place = isFinished ? index + 1 : '';
                    
                    return (
                      <TableRow 
                        key={result.participant.id}
                        className={!isFinished ? 'text-muted-foreground bg-muted/30' : ''}
                      >
                        <TableCell className="font-medium">{place}</TableCell>
                        <TableCell>
                          <div 
                            className="flex items-center gap-2 cursor-pointer hover:text-cycling-green"
                            onClick={() => navigate(`/participants/${result.participant.id}`)}
                          >
                            {result.participant.imageUrl ? (
                              <img 
                                src={result.participant.imageUrl} 
                                alt={result.participant.name}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                            )}
                            <span>{result.participant.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{result.participant.club || '—'}</TableCell>
                        
                        {/* Control points (excluding start) */}
                        {eventResults.controlPoints.slice(1).map((cp) => {
                          const controlPoint = result.result.controlPoints.find(
                            rcp => rcp.controlPointId === cp.id
                          );
                          
                          return (
                            <TableCell key={cp.id} className="text-center">
                              {controlPoint ? (
                                format(new Date(controlPoint.arrivalTime), 'HH:mm')
                              ) : (
                                '—'
                              )}
                            </TableCell>
                          );
                        })}
                        
                        <TableCell className="text-center">
                          {getStatusBadge(result.result.status)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatTime(result.result.totalTime)}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {result.result.avgSpeed ? `${result.result.avgSpeed.toFixed(1)} km/h` : '—'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {sortedResults.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7 + eventResults.controlPoints.length - 1} className="text-center py-8">
                        No results available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EventResults;
