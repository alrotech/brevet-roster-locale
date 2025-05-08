
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, User, MapPin, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Club data model
interface Club {
  id: string;
  name: string;
  location: string;
  representative?: string;
  website?: string;
  events?: number;
  description?: string;
  foundedYear?: number;
  members?: number;
}

// Sample clubs data
const clubsData: Club[] = [
  { 
    id: "520001", 
    name: "BELARUS RANDONNEURS CLUB", 
    location: "Минск", 
    representative: "Ivan Petrov", 
    website: "https://example.com/brc", 
    events: 12,
    description: "The first randonneuring club in Belarus, established to promote long-distance cycling and audax events throughout the country.",
    foundedYear: 2010,
    members: 78
  },
  { 
    id: "520002", 
    name: "SIABRY RANDONNEURS", 
    location: "Минск", 
    representative: "Alexei Ivanov", 
    website: "https://example.com/siabry", 
    events: 8,
    description: "A friendly community of cyclists focused on promoting audax cycling in and around Minsk.",
    foundedYear: 2012,
    members: 45
  },
  { 
    id: "520005", 
    name: "Grodno Cycling", 
    location: "Гродно", 
    representative: "Maria Kuznetsova", 
    website: "https://example.com/grodno", 
    events: 5,
    description: "Dedicated to developing cycling infrastructure and community in the Grodno region.",
    foundedYear: 2015,
    members: 32
  },
  { 
    id: "520006", 
    name: "BBB -Vitebsk Randonneurs", 
    location: "Витебск", 
    representative: "Pavel Smirnov", 
    events: 4,
    description: "Promoting long-distance cycling in the Vitebsk region with a focus on scenic routes.",
    foundedYear: 2016,
    members: 27
  },
  { 
    id: "520007", 
    name: "Cadence Mogilev", 
    location: "Могилёв", 
    representative: "Natalia Volkova", 
    website: "https://example.com/cadence", 
    events: 6,
    description: "A club focused on developing cycling skills and endurance among Mogilev cyclists.",
    foundedYear: 2014,
    members: 38
  },
  { 
    id: "520009", 
    name: "NA SHOSSERE", 
    location: "Полоцк", 
    representative: "Sergei Kozlov", 
    events: 3,
    description: "Specialized in road cycling events and promoting safe riding practices.",
    foundedYear: 2017,
    members: 19
  },
  { 
    id: "520010", 
    name: "Versta", 
    location: "Новополоцк", 
    representative: "Elena Morozova", 
    website: "https://example.com/versta", 
    events: 7,
    description: "Named after the Russian unit of distance, this club focuses on traditional long-distance brevets.",
    foundedYear: 2015,
    members: 42
  },
  { 
    id: "520011", 
    name: "Veloslonim", 
    location: "Слоним", 
    events: 2,
    description: "A small but dedicated group of randonneurs in the Slonim area.",
    foundedYear: 2018,
    members: 15
  },
  { 
    id: "520012", 
    name: "Audax Lida", 
    location: "Лида", 
    representative: "Dmitry Sokolov", 
    events: 5,
    description: "Following the audax tradition with a focus on self-sufficiency and camaraderie.",
    foundedYear: 2016,
    members: 29
  },
  { 
    id: "520013", 
    name: "VELO-GORKI", 
    location: "Горки", 
    representative: "Anna Petrova", 
    website: "https://example.com/gorki", 
    events: 4,
    description: "Promoting cycling culture in smaller towns and rural areas around Gorki.",
    foundedYear: 2017,
    members: 24
  },
  { 
    id: "520014", 
    name: "Audax Zhodino", 
    location: "Жодино", 
    representative: "Mikhail Ivanov", 
    events: 3,
    description: "Industrial town with a growing cycling community focused on endurance events.",
    foundedYear: 2018,
    members: 22
  },
  { 
    id: "520015", 
    name: "Velo Gomel", 
    location: "Гомель", 
    representative: "Olga Sidorova", 
    website: "https://example.com/gomel", 
    events: 6,
    description: "The largest randonneuring club in southeastern Belarus, organizing diverse cycling events.",
    foundedYear: 2014,
    members: 51
  },
  { 
    id: "520016", 
    name: "ZaVeloBrest", 
    location: "Брест", 
    representative: "Vladimir Kuznetsov", 
    website: "https://example.com/brest", 
    events: 7,
    description: "Located in the western border city, this club often organizes cross-border events with Polish clubs.",
    foundedYear: 2015,
    members: 36
  },
  { 
    id: "520099", 
    name: "INDEPENDENT BELARUS", 
    location: "Individual Belarusian Randonneur", 
    events: 0,
    description: "Not an organized club, but a category for individual randonneurs from Belarus without club affiliation.",
    members: 12
  }
];

// Mock event data for club details
interface Event {
  id: string;
  name: string;
  date: string;
  distance: number;
  participants: number;
  status: 'upcoming' | 'completed' | 'canceled';
}

const mockEvents: Record<string, Event[]> = {
  "520001": [
    { id: "ev1", name: "Minsk 200", date: "2025-06-15", distance: 200, participants: 45, status: 'upcoming' },
    { id: "ev2", name: "Belarus 400", date: "2025-05-20", distance: 400, participants: 28, status: 'upcoming' },
    { id: "ev3", name: "Capital Ring 300", date: "2025-04-10", distance: 300, participants: 32, status: 'completed' }
  ],
  "520002": [
    { id: "ev4", name: "Friendship Route 200", date: "2025-07-05", distance: 200, participants: 36, status: 'upcoming' },
    { id: "ev5", name: "Eastern Loop 300", date: "2025-05-18", distance: 300, participants: 24, status: 'upcoming' }
  ]
};

// Default mock events for clubs without specific events
const defaultEvents: Event[] = [
  { id: "def1", name: "Regional 200", date: "2025-06-22", distance: 200, participants: 22, status: 'upcoming' },
  { id: "def2", name: "Local 300", date: "2025-05-15", distance: 300, participants: 15, status: 'upcoming' }
];

const ClubDetails = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  
  const club = clubsData.find(c => c.id === clubId);
  
  if (!club) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/clubs')} 
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clubs
        </Button>
        <h1 className="text-2xl font-bold mb-4">Club Not Found</h1>
        <p>The club you are looking for does not exist or has been removed.</p>
      </div>
    );
  }
  
  // Get club events or use default mock events if none are specified
  const clubEvents = mockEvents[clubId] || defaultEvents;
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/clubs')} 
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clubs
      </Button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-cycling-green/10 text-cycling-green border-cycling-green/20">
                  {club.id}
                </Badge>
                {club.foundedYear && (
                  <Badge variant="outline" className="bg-cycling-blue/10 text-cycling-blue border-cycling-blue/20">
                    Est. {club.foundedYear}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-cycling-blue">{club.name}</h1>
              <div className="flex items-center gap-1 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                <span>{club.location}</span>
              </div>
            </div>
            {club.website && (
              <a 
                href={club.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cycling-blue hover:text-cycling-orange transition-colors flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                <span>Website</span>
              </a>
            )}
          </div>
          
          {club.description && (
            <div className="mt-4 text-muted-foreground">
              {club.description}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x bg-muted/10">
          <div className="p-4 flex items-center gap-3">
            <User className="h-5 w-5 text-cycling-green" />
            <div>
              <div className="text-sm text-muted-foreground">Representative</div>
              <div className="font-medium">{club.representative || "Not specified"}</div>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Info className="h-5 w-5 text-cycling-orange" />
            <div>
              <div className="text-sm text-muted-foreground">Members</div>
              <div className="font-medium">{club.members || 0} cyclists</div>
            </div>
          </div>
          <div className="p-4 flex items-center gap-3">
            <Info className="h-5 w-5 text-cycling-blue" />
            <div>
              <div className="text-sm text-muted-foreground">Events Organized</div>
              <div className="font-medium">{club.events || 0} events</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-cycling-green">Upcoming & Recent Events</h2>
            {clubEvents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clubEvents.map((event) => (
                    <TableRow 
                      key={event.id} 
                      className="hover:bg-muted/30 cursor-pointer"
                      onClick={() => navigate(`/events/${event.id}/results`)}
                    >
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.distance} km</TableCell>
                      <TableCell>{event.participants}</TableCell>
                      <TableCell>
                        {event.status === 'upcoming' && (
                          <Badge className="bg-cycling-blue text-white">Upcoming</Badge>
                        )}
                        {event.status === 'completed' && (
                          <Badge className="bg-cycling-green text-white">Completed</Badge>
                        )}
                        {event.status === 'canceled' && (
                          <Badge variant="destructive">Canceled</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No events found for this club.
              </p>
            )}
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-cycling-blue">Club Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Distance Covered</div>
                <div className="text-2xl font-semibold text-cycling-green">
                  {(club.events || 0) * 250} km
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Most Popular Distance</div>
                <div className="text-2xl font-semibold text-cycling-orange">
                  200 km
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Average Participants per Event</div>
                <div className="text-2xl font-semibold text-cycling-blue">
                  {Math.floor((club.members || 20) / 2)}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/statistics')}
                >
                  View All Stats
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl text-cycling-blue">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              {club.representative ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-cycling-blue" />
                    <span>{club.representative}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cycling-green" />
                    <span>{club.location}</span>
                  </div>
                  {club.website && (
                    <div>
                      <a 
                        href={club.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cycling-blue hover:text-cycling-orange transition-colors flex items-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Visit website</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Contact information not available for this club.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
