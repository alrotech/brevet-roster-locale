import data from '@/data/db.json';

export type Brevet = typeof data.brevets[0];
export type Club = typeof data.clubs[0];
export type Route = typeof data.routes[0];
export type Participant = typeof data.participants[0];
export type Result = typeof data.results[0];

export const getBrevets = () => data.brevets;
export const getClubs = () => data.clubs;
export const getRoutes = () => data.routes;
export const getParticipants = () => data.participants;
export const getResults = () => data.results;

export const getBrevetById = (id: string) => data.brevets.find(b => b.id === id);
export const getClubById = (id: string) => data.clubs.find(c => c.id === id);
export const getRouteById = (id: string) => data.routes.find(r => r.id === id);
export const getParticipantById = (id: string) => data.participants.find(p => p.id === id);
export const getResultById = (id: string) => data.results.find(r => r.eventId === id);

export const getParticipantResults = (participantId: string) => {
  return data.results.flatMap(event => 
    event.results
      .filter(r => r.participant === participantId)
      .map(r => ({
        eventId: event.eventId,
        eventName: event.eventName,
        date: event.date,
        distance: event.distance,
        result: r.result
      }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const formatTime = (minutes?: number) => {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getStatistics = () => {
  const totalParticipants = data.participants.length;
  const totalEvents = data.results.length;
  
  const finishedResults = data.results.flatMap(event => 
    event.results.filter(r => r.result.status === "Finished")
  );
  
  const totalFinishers = finishedResults.length;
  const totalDistance = finishedResults.reduce((sum, r) => {
    const event = data.results.find(e => e.eventId === r.result.eventId);
    return sum + (event?.distance || 0);
  }, 0);
  
  const avgCompletionRate = (totalFinishers / (data.results.flatMap(e => e.results).length)) * 100;
  
  return {
    totalParticipants,
    totalEvents,
    totalFinishers,
    totalDistance,
    avgCompletionRate
  };
};