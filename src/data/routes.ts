
// Sample data structure for routes
export interface Route {
  id: string;
  name: string;
  distance: number; // in kilometers
  startPoint: string;
  endPoint: string;
  eventIds: string[]; // IDs of associated events/fests
  description?: string;
  imageUrl?: string;
  originalEventId?: string; // Reference to the original event where this route was first used
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Difficult' | 'Extreme';
  elevation?: number; // in meters
  terrain?: string;
  createdAt: string; // ISO date string
}

// Sample routes data
export const routes: Route[] = [
  {
    id: "r1",
    name: "Paris-Brest-Paris Classic",
    distance: 1200,
    startPoint: "Paris, France",
    endPoint: "Paris, France",
    eventIds: ["e1", "e5"],
    description: "The iconic Paris-Brest-Paris route, one of the oldest cycling events still run on a regular basis.",
    imageUrl: "https://images.unsplash.com/photo-1502666229619-dae2d117989a?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e1",
    difficulty: "Difficult",
    elevation: 12000,
    terrain: "Mixed - country roads and some urban sections",
    createdAt: "2022-01-15T09:00:00Z"
  },
  {
    id: "r2",
    name: "London-Edinburgh-London",
    distance: 1500,
    startPoint: "London, UK",
    endPoint: "London, UK",
    eventIds: ["e2"],
    description: "A challenging route from London to Edinburgh and back, testing endurance over varied British terrain.",
    imageUrl: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop",
    originalEventId: "e2",
    difficulty: "Extreme",
    elevation: 11500,
    terrain: "Rolling hills, some mountainous sections in Scotland",
    createdAt: "2022-02-10T10:30:00Z"
  },
  {
    id: "r3",
    name: "Cascade 1200",
    distance: 1240,
    startPoint: "Seattle, WA",
    endPoint: "Seattle, WA",
    eventIds: ["e3"],
    description: "Beautiful tour through the Cascade Mountains of Washington state.",
    imageUrl: "https://images.unsplash.com/photo-1534481016308-0fca71578ae5?q=80&w=2074&auto=format&fit=crop",
    originalEventId: "e3",
    difficulty: "Difficult",
    elevation: 13500,
    terrain: "Mountainous with steep climbs",
    createdAt: "2022-03-05T08:15:00Z"
  },
  {
    id: "r4",
    name: "Gold Rush Randonnée",
    distance: 1200,
    startPoint: "Davis, CA",
    endPoint: "Davis, CA",
    eventIds: ["e4"],
    description: "A challenging route through the Sierra Nevada mountains of California.",
    imageUrl: "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e4",
    difficulty: "Difficult",
    elevation: 12000,
    terrain: "Mountains and foothills",
    createdAt: "2022-04-20T11:45:00Z"
  },
  {
    id: "r5",
    name: "Rocky Mountain 1200",
    distance: 1200,
    startPoint: "Kamloops, BC, Canada",
    endPoint: "Kamloops, BC, Canada",
    eventIds: ["e6"],
    description: "Spectacular route through the Canadian Rockies with breathtaking mountain vistas.",
    imageUrl: "https://images.unsplash.com/photo-1471958680802-1345a694ba6d?q=80&w=2066&auto=format&fit=crop",
    originalEventId: "e6",
    difficulty: "Extreme",
    elevation: 14500,
    terrain: "Alpine mountains with significant climbing",
    createdAt: "2022-05-12T14:20:00Z"
  },
  {
    id: "r6",
    name: "Super Randonnée Pyrenees",
    distance: 600,
    startPoint: "Perpignan, France",
    endPoint: "Perpignan, France",
    eventIds: [],
    description: "A challenging permanent route through the Pyrenees mountains.",
    imageUrl: "https://images.unsplash.com/photo-1473620669181-dd0c1467a1d3?q=80&w=2069&auto=format&fit=crop",
    difficulty: "Extreme",
    elevation: 11000,
    terrain: "High mountains with steep ascents",
    createdAt: "2022-06-08T16:30:00Z"
  },
  {
    id: "r7",
    name: "Granite Anvil 1200",
    distance: 1200,
    startPoint: "Ottawa, ON, Canada",
    endPoint: "Ottawa, ON, Canada",
    eventIds: ["e7"],
    description: "Ontario's premier 1200km randonnée through the Canadian Shield and along the Great Lakes.",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e7",
    difficulty: "Challenging",
    elevation: 8500,
    terrain: "Rolling hills with some flat sections",
    createdAt: "2022-07-15T09:10:00Z"
  },
  {
    id: "r8",
    name: "Hokkaido 1200",
    distance: 1200,
    startPoint: "Sapporo, Japan",
    endPoint: "Sapporo, Japan",
    eventIds: ["e8"],
    description: "Tour of Japan's northern island featuring beautiful coastal roads and mountain passes.",
    imageUrl: "https://images.unsplash.com/photo-1526236084600-be78e613201e?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e8",
    difficulty: "Challenging",
    elevation: 9500,
    terrain: "Mixed coastal and mountain roads",
    createdAt: "2022-08-22T10:25:00Z"
  },
  {
    id: "r9",
    name: "Southern California 400k",
    distance: 400,
    startPoint: "San Diego, CA",
    endPoint: "San Diego, CA",
    eventIds: ["e9"],
    description: "Coastal and desert route through Southern California's varied terrain.",
    imageUrl: "https://images.unsplash.com/photo-1542258894-b8c5a4a6ff9d?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e9",
    difficulty: "Moderate",
    elevation: 4500,
    terrain: "Mixed coastal and inland, some desert sections",
    createdAt: "2022-09-30T13:40:00Z"
  },
  {
    id: "r10",
    name: "Appalachian Adventure 600k",
    distance: 600,
    startPoint: "Asheville, NC",
    endPoint: "Asheville, NC",
    eventIds: ["e10"],
    description: "Scenic tour through the Blue Ridge Mountains and Appalachian terrain.",
    imageUrl: "https://images.unsplash.com/photo-1547171171-77c956ebdcf7?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e10",
    difficulty: "Difficult",
    elevation: 7500,
    terrain: "Mountains with significant climbing",
    createdAt: "2022-10-14T15:55:00Z"
  },
  {
    id: "r11",
    name: "New England 200k",
    distance: 200,
    startPoint: "Boston, MA",
    endPoint: "Boston, MA",
    eventIds: ["e11"],
    description: "Classic New England route through historic towns and scenic countryside.",
    imageUrl: "https://images.unsplash.com/photo-1505699261378-c267d679f4fc?q=80&w=2070&auto=format&fit=crop",
    originalEventId: "e11",
    difficulty: "Moderate",
    elevation: 2000,
    terrain: "Rolling hills, some flat sections",
    createdAt: "2022-11-05T08:15:00Z"
  },
  {
    id: "r12",
    name: "Great Lakes 300k",
    distance: 300,
    startPoint: "Chicago, IL",
    endPoint: "Chicago, IL",
    eventIds: ["e12"],
    description: "Scenic route along the shores of Lake Michigan with beautiful water views.",
    imageUrl: "https://images.unsplash.com/photo-1605131545848-f32ff6fcb3d1?q=80&w=2071&auto=format&fit=crop",
    originalEventId: "e12",
    difficulty: "Easy",
    elevation: 1500,
    terrain: "Mostly flat with some gentle hills",
    createdAt: "2022-12-12T11:30:00Z"
  }
];
