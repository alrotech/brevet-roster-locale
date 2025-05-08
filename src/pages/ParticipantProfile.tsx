
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, User, Award, Medal } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  getParticipantById, 
  getParticipantResults,
  formatTime 
} from '@/data/results';

const ParticipantProfile = () => {
  const { participantId } = useParams();
  const navigate = useNavigate();
  
  // Fetch participant data
  const participant = participantId ? getParticipantById(participantId) : null;
  const results = participantId ? getParticipantResults(participantId) : [];
  
  // Calculate statistics
  const totalDistance = results
    .filter(r => r.result.status === 'Finished')
    .reduce((sum, r) => sum + r.distance, 0);
    
  const finishedEvents = results.filter(r => r.result.status === 'Finished').length;
  const dnfEvents = results.filter(r => r.result.status === 'DNF').length;
  const otlEvents = results.filter(r => r.result.status === 'OTL').length;
  
  // Handle missing participant
  if (!participant) {
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
          <p className="text-center py-8">Participant not found.</p>
        </div>
      </div>
    );
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div>
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {participant.imageUrl ? (
                  <img 
                    src={participant.imageUrl} 
                    alt={participant.name}
                    className="h-32 w-32 rounded-full object-cover border-4 border-cycling-green"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-cycling-green">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardTitle className="text-2xl">{participant.name}</CardTitle>
              {participant.club && (
                <CardDescription className="text-base">
                  {participant.club}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {(participant.city || participant.country) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {participant.city}{participant.city && participant.country && ', '}{participant.country}
                    </span>
                  </div>
                )}
                
                {participant.gender && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {participant.gender === 'M' ? 'Male' : 'Female'}
                      {participant.birthYear && `, ${new Date().getFullYear() - participant.birthYear} years`}
                    </span>
                  </div>
                )}
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cycling-green">{participant.totalEvents || 0}</div>
                    <div className="text-sm text-muted-foreground">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cycling-green">{participant.totalDistance?.toLocaleString() || 0}</div>
                    <div className="text-sm text-muted-foreground">Total km</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Achievements card */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-cycling-orange" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                {finishedEvents >= 5 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-cycling-orange" />
                    <span>Endurance Expert: Completed {finishedEvents} events</span>
                  </div>
                )}
                
                {totalDistance >= 1000 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-cycling-orange" />
                    <span>Distance Champion: {totalDistance.toLocaleString()}km total</span>
                  </div>
                )}
                
                {results.some(r => r.distance >= 600 && r.result.status === 'Finished') && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-cycling-orange" />
                    <span>Ultra Randonneur: Completed 600km+ brevet</span>
                  </div>
                )}
                
                {finishedEvents === 0 && totalDistance === 0 && !results.some(r => r.distance >= 600 && r.result.status === 'Finished') && (
                  <div className="text-center text-muted-foreground py-2">
                    No achievements yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cycling-blue" />
                Event Results
              </CardTitle>
              <CardDescription>
                {results.length} total events | {finishedEvents} finished | {dnfEvents} DNF | {otlEvents} OTL
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {results.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                      <TableHead className="text-right">Avg Speed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => {
                      const isFinished = result.result.status === 'Finished';
                      
                      return (
                        <TableRow 
                          key={result.eventId}
                          className={!isFinished ? 'text-muted-foreground bg-muted/30' : ''}
                        >
                          <TableCell>
                            {format(new Date(result.date), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>
                            <Link 
                              to={`/events/${result.eventId}/results`}
                              className="hover:text-cycling-green"
                            >
                              {result.eventName}
                            </Link>
                          </TableCell>
                          <TableCell>{result.distance} km</TableCell>
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
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No event results available.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParticipantProfile;
