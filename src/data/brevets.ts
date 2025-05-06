export type BrevetsDistance = 200 | 300 | 400 | 600 | 1000 | 1200;

export interface Brevet {
  id: string;
  title: string;
  date: string; // ISO date string
  startTime: string; // "HH:MM" format
  city: string;
  state?: string;
  country: string;
  distance: BrevetsDistance;
  organizer: string;
  description: string;
  startLocation: string;
  timeLimit: string;
  route?: string; // URL to route
  elevation?: number; // in meters
  registrationUrl?: string;
  contactEmail?: string;
  imageUrl?: string; // New field for event images
}

// Sample data
export const brevets: Brevet[] = [
  {
    id: "1",
    title: "Spring 200k",
    date: "2025-05-15",
    startTime: "07:00",
    city: "Seattle",
    state: "WA",
    country: "USA",
    distance: 200,
    organizer: "Seattle Randonneurs",
    description: "A scenic route through the Cascade foothills with moderate climbing.",
    startLocation: "Gas Works Park",
    timeLimit: "13h30m",
    elevation: 2500,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@seattlerandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Summer 300k",
    date: "2025-06-12",
    startTime: "06:00",
    city: "Portland",
    state: "OR",
    country: "USA",
    distance: 300,
    organizer: "Oregon Randonneurs",
    description: "Beautiful ride through the Willamette Valley with vineyard views.",
    startLocation: "Pioneer Courthouse Square",
    timeLimit: "20h00m",
    elevation: 3800,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@orrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "Mountain 400k",
    date: "2025-07-05",
    startTime: "05:00",
    city: "Boulder",
    state: "CO",
    country: "USA",
    distance: 400,
    organizer: "Rocky Mountain Cycling Club",
    description: "Challenging mountain route with significant climbing.",
    startLocation: "Boulder Creek Path",
    timeLimit: "27h00m",
    elevation: 6500,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@rmcc.org",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "East Bay 200k",
    date: "2025-05-22",
    startTime: "07:30",
    city: "Oakland",
    state: "CA",
    country: "USA",
    distance: 200,
    organizer: "San Francisco Randonneurs",
    description: "Rolling hills and beautiful bay views through the East Bay.",
    startLocation: "Lake Merritt",
    timeLimit: "13h30m",
    elevation: 2200,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@sfrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Summer 600k",
    date: "2025-06-19",
    startTime: "05:00",
    city: "Chicago",
    state: "IL",
    country: "USA",
    distance: 600,
    organizer: "Chicago Randonneurs",
    description: "Two-day adventure through rural Illinois and Wisconsin.",
    startLocation: "Millennium Park",
    timeLimit: "40h00m",
    elevation: 4100,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@chicagorandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1530541969540-f46353a93941?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    title: "Autumn Century+",
    date: "2025-09-10",
    startTime: "07:00",
    city: "Boston",
    state: "MA",
    country: "USA",
    distance: 200,
    organizer: "New England Randonneurs",
    description: "Fall foliage tour through historic New England towns.",
    startLocation: "Boston Common",
    timeLimit: "13h30m",
    elevation: 2300,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@nerando.org",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e530d3ca4e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7",
    title: "Desert 400k",
    date: "2025-10-05",
    startTime: "04:30",
    city: "Tucson",
    state: "AZ",
    country: "USA",
    distance: 400,
    organizer: "Arizona Randonneurs",
    description: "Desert landscapes and challenging climbs through Saguaro National Park.",
    startLocation: "Tucson Bicycle House",
    timeLimit: "27h00m",
    elevation: 5100,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@azrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "8",
    title: "Winter 200k",
    date: "2025-01-15",
    startTime: "08:00",
    city: "San Diego",
    state: "CA",
    country: "USA",
    distance: 200,
    organizer: "San Diego Randonneurs",
    description: "Mild winter riding along the beautiful Southern California coast.",
    startLocation: "Balboa Park",
    timeLimit: "13h30m",
    elevation: 1800,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@sdrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "9",
    title: "Grand 1000k",
    date: "2025-08-01",
    startTime: "04:00",
    city: "Seattle",
    state: "WA",
    country: "USA",
    distance: 1000,
    organizer: "Cascade Randonneurs",
    description: "Epic journey through the Cascade mountains and Olympic Peninsula.",
    startLocation: "Gas Works Park",
    timeLimit: "75h00m",
    elevation: 12500,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@cascaderandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "10",
    title: "NYC 300k",
    date: "2025-05-29",
    startTime: "06:00",
    city: "New York",
    state: "NY",
    country: "USA",
    distance: 300,
    organizer: "New York Randonneurs",
    description: "Ride from the big city into the beautiful Hudson Valley.",
    startLocation: "Central Park",
    timeLimit: "20h00m",
    elevation: 3100,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@nyrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "11",
    title: "Classic 600k",
    date: "2025-07-19",
    startTime: "05:00",
    city: "Portland",
    state: "OR",
    country: "USA",
    distance: 600,
    organizer: "Oregon Randonneurs",
    description: "Two-day journey through the scenic Cascade Range.",
    startLocation: "Pioneer Courthouse Square",
    timeLimit: "40h00m",
    elevation: 7800,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@orrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "12",
    title: "Spring 1200k",
    date: "2025-04-20",
    startTime: "04:00",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    distance: 1200,
    organizer: "San Francisco Randonneurs",
    description: "The classic Gold Rush Randonnée through Northern California.",
    startLocation: "Golden Gate Bridge Plaza",
    timeLimit: "90h00m",
    elevation: 15000,
    registrationUrl: "https://example.com/register",
    contactEmail: "info@sfrandonneurs.org",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  }
];

export const uniqueCities = Array.from(new Set(brevets.map(brevet => brevet.city)));

export const distanceOptions = [200, 300, 400, 600, 1000, 1200] as const;

// Get unique years from the brevet dates
export const uniqueYears = Array.from(
  new Set(brevets.map(brevet => new Date(brevet.date).getFullYear()))
).sort((a, b) => b - a); // Sort years in descending order
