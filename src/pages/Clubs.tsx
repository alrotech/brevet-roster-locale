
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, User, Link } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Club data model
interface Club {
  id: string;
  name: string;
  location: string;
  representative?: string;
  website?: string;
  events?: number;
}

// Sample clubs data based on provided information
const clubsData: Club[] = [
  { id: "520001", name: "BELARUS RANDONNEURS CLUB", location: "Минск", representative: "Ivan Petrov", website: "https://example.com/brc", events: 12 },
  { id: "520002", name: "SIABRY RANDONNEURS", location: "Минск", representative: "Alexei Ivanov", website: "https://example.com/siabry", events: 8 },
  { id: "520005", name: "Grodno Cycling", location: "Гродно", representative: "Maria Kuznetsova", website: "https://example.com/grodno", events: 5 },
  { id: "520006", name: "BBB -Vitebsk Randonneurs", location: "Витебск", representative: "Pavel Smirnov", events: 4 },
  { id: "520007", name: "Cadence Mogilev", location: "Могилёв", representative: "Natalia Volkova", website: "https://example.com/cadence", events: 6 },
  { id: "520009", name: "NA SHOSSERE", location: "Полоцк", representative: "Sergei Kozlov", events: 3 },
  { id: "520010", name: "Versta", location: "Новополоцк", representative: "Elena Morozova", website: "https://example.com/versta", events: 7 },
  { id: "520011", name: "Veloslonim", location: "Слоним", events: 2 },
  { id: "520012", name: "Audax Lida", location: "Лида", representative: "Dmitry Sokolov", events: 5 },
  { id: "520013", name: "VELO-GORKI", location: "Горки", representative: "Anna Petrova", website: "https://example.com/gorki", events: 4 },
  { id: "520014", name: "Audax Zhodino", location: "Жодино", representative: "Mikhail Ivanov", events: 3 },
  { id: "520015", name: "Velo Gomel", location: "Гомель", representative: "Olga Sidorova", website: "https://example.com/gomel", events: 6 },
  { id: "520016", name: "ZaVeloBrest", location: "Брест", representative: "Vladimir Kuznetsov", website: "https://example.com/brest", events: 7 },
  { id: "520099", name: "INDEPENDENT BELARUS", location: "Individual Belarusian Randonneur", events: 0 }
];

const Clubs = () => {
  const navigate = useNavigate();
  
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
        <h1 className="text-4xl font-bold text-cycling-blue">Randonneuring Clubs</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Find local randonneuring clubs and organizations across Belarus
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-cycling-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-cycling-green">14</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Registered Clubs</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-cycling-orange">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-cycling-orange">72</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Events Organized</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-cycling-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-cycling-blue">528</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 text-cycling-green">Club Directory</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">Club ID</TableHead>
                <TableHead>Club Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Representative</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubsData.map((club) => (
                <TableRow key={club.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => navigate(`/clubs/${club.id}`)}>
                  <TableCell className="font-mono">{club.id}</TableCell>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.location}</TableCell>
                  <TableCell>
                    {club.representative ? (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-cycling-blue" />
                        {club.representative}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {club.events && club.events > 0 ? (
                      <Badge variant="outline" className="bg-cycling-green/10 text-cycling-green border-cycling-green/20">
                        {club.events} events
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted/20 text-muted-foreground">
                        No events
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {club.website ? (
                      <a
                        href={club.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center text-cycling-blue hover:text-cycling-orange transition-colors"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    ) : (
                      <span className="text-muted-foreground">No website</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-cycling-green">About Randonneuring Clubs</h2>
        <p className="mb-4">
          Randonneuring clubs organize and oversee brevet events, providing support and community for long-distance cyclists.
          Each club has a unique identification number and may host various events throughout the year.
        </p>
        <p>
          Individual randonneurs can participate in events organized by any club, and achievements are
          tracked through the central randonneuring database.
        </p>
      </div>
    </div>
  );
};

export default Clubs;
