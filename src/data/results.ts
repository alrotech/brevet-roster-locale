
export interface Participant {
  id: string;
  name: string;
  club?: string;
  country?: string;
  city?: string;
  gender?: 'M' | 'F';
  birthYear?: number;
  totalEvents?: number;
  totalDistance?: number;
  imageUrl?: string;
}

export interface ControlPoint {
  id: string;
  name: string;
  distance: number; // km from start
  timeLimit?: number; // minutes from start
}

export interface ParticipantResult {
  participantId: string;
  eventId: string;
  startTime: string; // ISO string
  controlPoints: Array<{
    controlPointId: string;
    arrivalTime: string; // ISO string
  }>;
  finishTime?: string; // ISO string 
  status: 'DNS' | 'DNF' | 'OTL' | 'DQ' | 'Finished';
  totalTime?: number; // in minutes
  avgSpeed?: number; // km/h
  notes?: string;
}

export interface EventResults {
  eventId: string;
  eventName: string;
  date: string;
  distance: number;
  controlPoints: ControlPoint[];
  results: {
    participant: Participant;
    result: ParticipantResult;
  }[];
}

// Mock data for participants
export const participants: Participant[] = [
  {
    id: "p1",
    name: "John Doe",
    club: "Seattle Randonneurs",
    country: "USA",
    city: "Seattle",
    gender: "M",
    birthYear: 1985,
    totalEvents: 24,
    totalDistance: 6400,
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "p2",
    name: "Jane Smith",
    club: "Portland Randonneurs",
    country: "USA",
    city: "Portland",
    gender: "F",
    birthYear: 1990,
    totalEvents: 18,
    totalDistance: 4800,
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "p3",
    name: "Robert Johnson",
    club: "SF Randonneurs",
    country: "USA",
    city: "San Francisco",
    gender: "M",
    birthYear: 1975,
    totalEvents: 42,
    totalDistance: 12600,
    imageUrl: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: "p4",
    name: "Emily Chen",
    club: "NYC Randonneurs",
    country: "USA",
    city: "New York",
    gender: "F",
    birthYear: 1988,
    totalEvents: 15,
    totalDistance: 3800,
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: "p5",
    name: "Michael Williams",
    club: "Chicago Randonneurs",
    country: "USA",
    city: "Chicago",
    gender: "M",
    birthYear: 1982,
    totalEvents: 30,
    totalDistance: 7600,
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: "p6",
    name: "Sarah Brown",
    club: "Boston Randonneurs",
    country: "USA",
    city: "Boston",
    gender: "F",
    birthYear: 1979,
    totalEvents: 22,
    totalDistance: 5400,
    imageUrl: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

// Mock data for event results
export const eventResultsData: EventResults[] = [
  {
    eventId: "1",
    eventName: "Spring 200k",
    date: "2025-05-15",
    distance: 200,
    controlPoints: [
      { id: "cp1", name: "Start", distance: 0 },
      { id: "cp2", name: "Checkpoint 1", distance: 50 },
      { id: "cp3", name: "Checkpoint 2", distance: 100 },
      { id: "cp4", name: "Checkpoint 3", distance: 150 },
      { id: "cp5", name: "Finish", distance: 200 }
    ],
    results: [
      {
        participant: participants[0],
        result: {
          participantId: "p1",
          eventId: "1",
          startTime: "2025-05-15T07:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-05-15T07:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-05-15T09:15:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-05-15T11:30:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-05-15T14:00:00Z" },
            { controlPointId: "cp5", arrivalTime: "2025-05-15T16:30:00Z" }
          ],
          finishTime: "2025-05-15T16:30:00Z",
          status: "Finished",
          totalTime: 570, // 9h 30m
          avgSpeed: 21.05
        }
      },
      {
        participant: participants[1],
        result: {
          participantId: "p2",
          eventId: "1",
          startTime: "2025-05-15T07:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-05-15T07:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-05-15T09:30:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-05-15T12:15:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-05-15T15:00:00Z" },
            { controlPointId: "cp5", arrivalTime: "2025-05-15T17:20:00Z" }
          ],
          finishTime: "2025-05-15T17:20:00Z",
          status: "Finished",
          totalTime: 620, // 10h 20m
          avgSpeed: 19.35
        }
      },
      {
        participant: participants[2],
        result: {
          participantId: "p3",
          eventId: "1",
          startTime: "2025-05-15T07:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-05-15T07:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-05-15T08:45:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-05-15T10:30:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-05-15T12:30:00Z" }
          ],
          status: "DNF"
        }
      },
      {
        participant: participants[3],
        result: {
          participantId: "p4",
          eventId: "1",
          startTime: "2025-05-15T07:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-05-15T07:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-05-15T09:10:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-05-15T11:20:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-05-15T13:45:00Z" },
            { controlPointId: "cp5", arrivalTime: "2025-05-15T16:15:00Z" }
          ],
          finishTime: "2025-05-15T16:15:00Z",
          status: "Finished",
          totalTime: 555, // 9h 15m
          avgSpeed: 21.62
        }
      },
      {
        participant: participants[4],
        result: {
          participantId: "p5",
          eventId: "1",
          startTime: "2025-05-15T07:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-05-15T07:00:00Z" }
          ],
          status: "DNS"
        }
      },
      {
        participant: participants[5],
        result: {
          participantId: "p6",
          eventId: "1",
          startTime: "2025-05-15T07:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-05-15T07:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-05-15T09:20:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-05-15T11:50:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-05-15T15:10:00Z" }
          ],
          status: "OTL" // Over time limit
        }
      }
    ]
  },
  {
    eventId: "2",
    eventName: "Summer 300k",
    date: "2025-06-12",
    distance: 300,
    controlPoints: [
      { id: "cp1", name: "Start", distance: 0 },
      { id: "cp2", name: "Checkpoint 1", distance: 75 },
      { id: "cp3", name: "Checkpoint 2", distance: 150 },
      { id: "cp4", name: "Checkpoint 3", distance: 225 },
      { id: "cp5", name: "Finish", distance: 300 }
    ],
    results: [
      {
        participant: participants[0],
        result: {
          participantId: "p1",
          eventId: "2",
          startTime: "2025-06-12T06:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-06-12T06:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-06-12T09:45:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-06-12T14:00:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-06-12T18:30:00Z" },
            { controlPointId: "cp5", arrivalTime: "2025-06-12T22:45:00Z" }
          ],
          finishTime: "2025-06-12T22:45:00Z",
          status: "Finished",
          totalTime: 1005, // 16h 45m
          avgSpeed: 17.91
        }
      },
      {
        participant: participants[2],
        result: {
          participantId: "p3",
          eventId: "2",
          startTime: "2025-06-12T06:00:00Z",
          controlPoints: [
            { controlPointId: "cp1", arrivalTime: "2025-06-12T06:00:00Z" },
            { controlPointId: "cp2", arrivalTime: "2025-06-12T09:15:00Z" },
            { controlPointId: "cp3", arrivalTime: "2025-06-12T13:00:00Z" },
            { controlPointId: "cp4", arrivalTime: "2025-06-12T17:20:00Z" },
            { controlPointId: "cp5", arrivalTime: "2025-06-12T21:30:00Z" }
          ],
          finishTime: "2025-06-12T21:30:00Z",
          status: "Finished",
          totalTime: 930, // 15h 30m
          avgSpeed: 19.35
        }
      }
    ]
  }
];

// Helper function to get all results for a specific participant
export function getParticipantResults(participantId: string) {
  return eventResultsData
    .flatMap(event => 
      event.results
        .filter(r => r.participant.id === participantId)
        .map(r => ({
          eventId: event.eventId,
          eventName: event.eventName,
          date: event.date,
          distance: event.distance,
          result: r.result
        }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to get a participant by ID
export function getParticipantById(participantId: string) {
  return participants.find(p => p.id === participantId);
}

// Helper function to get event results by event ID
export function getEventResultsById(eventId: string) {
  return eventResultsData.find(e => e.eventId === eventId);
}

// Function to format time (minutes) into hours and minutes
export function formatTime(minutes?: number) {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Function to generate statistics
export function getStatistics() {
  const totalParticipants = participants.length;
  const totalEvents = eventResultsData.length;
  
  const finishedResults = eventResultsData.flatMap(event => 
    event.results.filter(r => r.result.status === "Finished")
  );
  
  const totalFinishers = finishedResults.length;
  const totalDistance = finishedResults.reduce((sum, r) => {
    const event = eventResultsData.find(e => e.eventId === r.result.eventId);
    return sum + (event?.distance || 0);
  }, 0);
  
  const fastestTime = finishedResults.reduce((fastest, r) => {
    if (r.result.totalTime && (!fastest || r.result.totalTime < fastest)) {
      return r.result.totalTime;
    }
    return fastest;
  }, 0);
  
  const avgCompletionRate = (totalFinishers / (eventResultsData.flatMap(e => e.results).length)) * 100;
  
  const participantsByCity = participants.reduce((acc, p) => {
    if (p.city) {
      acc[p.city] = (acc[p.city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const participantsByGender = participants.reduce((acc, p) => {
    if (p.gender) {
      acc[p.gender] = (acc[p.gender] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalParticipants,
    totalEvents,
    totalFinishers,
    totalDistance,
    fastestTime,
    avgCompletionRate,
    participantsByCity,
    participantsByGender
  };
}
