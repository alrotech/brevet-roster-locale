
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Award, Calendar, Medal, Activity, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatistics, participants, formatTime, eventResultsData } from '@/data/results';

const Statistics = () => {
  const navigate = useNavigate();
  const stats = getStatistics();
  
  // Get top participants by distance
  const topParticipants = [...participants]
    .sort((a, b) => (b.totalDistance || 0) - (a.totalDistance || 0))
    .slice(0, 5);
  
  // Get top events by participation
  const eventsByParticipation = [...eventResultsData]
    .sort((a, b) => b.results.length - a.results.length)
    .slice(0, 5);
  
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
        <h1 className="text-4xl font-bold text-cycling-blue">Statistics</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Randonneuring community statistics and achievements
        </p>
      </header>
      
      {/* Key statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-cycling-green" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cycling-green">
              {stats.totalParticipants}
            </div>
            <p className="text-sm text-muted-foreground">
              Active randonneurs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cycling-green" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cycling-green">
              {stats.totalEvents}
            </div>
            <p className="text-sm text-muted-foreground">
              Organized brevets
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-cycling-green" />
              Total Distance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cycling-green">
              {stats.totalDistance.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              Kilometers ridden
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Percent className="h-5 w-5 text-cycling-green" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cycling-green">
              {stats.avgCompletionRate.toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground">
              Average success rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-cycling-orange" />
              Top Participants by Distance
            </CardTitle>
            <CardDescription>
              Riders with the most kilometers completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead className="text-right">Distance</TableHead>
                  <TableHead className="text-right">Events</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topParticipants.map((participant, index) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div 
                        className="flex items-center gap-2 cursor-pointer hover:text-cycling-green"
                        onClick={() => navigate(`/participants/${participant.id}`)}
                      >
                        {participant.imageUrl ? (
                          <img 
                            src={participant.imageUrl} 
                            alt={participant.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                        )}
                        <span>{participant.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{participant.club || '—'}</TableCell>
                    <TableCell className="text-right">
                      {participant.totalDistance?.toLocaleString() || 0} km
                    </TableCell>
                    <TableCell className="text-right">
                      {participant.totalEvents || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-cycling-orange" />
              Top Events by Participation
            </CardTitle>
            <CardDescription>
              Most popular randonneuring events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead className="text-right">Participants</TableHead>
                  <TableHead className="text-right">Finish Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventsByParticipation.map((event, index) => {
                  const finishers = event.results.filter(r => r.result.status === "Finished").length;
                  const finishRate = (finishers / event.results.length) * 100;
                  
                  return (
                    <TableRow key={event.eventId}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div 
                          className="cursor-pointer hover:text-cycling-green"
                          onClick={() => navigate(`/events/${event.eventId}/results`)}
                        >
                          {event.eventName}
                        </div>
                      </TableCell>
                      <TableCell>{event.distance} km</TableCell>
                      <TableCell className="text-right">
                        {event.results.length}
                      </TableCell>
                      <TableCell className="text-right">
                        {finishRate.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Omologations Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Confirmed Results (Omologations)</CardTitle>
          <CardDescription>
            Official validation of successful randonneur achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Participant</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead className="text-right">Time</TableHead>
                <TableHead className="text-right">Omologation ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventResultsData.flatMap(event => 
                event.results
                  .filter(r => r.result.status === "Finished")
                  .map(r => ({
                    eventId: event.eventId,
                    eventName: event.eventName,
                    date: event.date,
                    distance: event.distance,
                    participant: r.participant,
                    result: r.result,
                    omologationId: `${new Date(event.date).getFullYear().toString().substring(2)}-${event.eventId}-${r.participant.id}`
                  }))
              ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div 
                      className="cursor-pointer hover:text-cycling-green"
                      onClick={() => navigate(`/events/${item.eventId}/results`)}
                    >
                      {item.eventName}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div 
                      className="cursor-pointer hover:text-cycling-green"
                      onClick={() => navigate(`/participants/${item.participant.id}`)}
                    >
                      {item.participant.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.distance} km</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatTime(item.result.totalTime)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.omologationId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
