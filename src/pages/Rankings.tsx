
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Award, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  ChartBar 
} from 'lucide-react';

const Rankings = () => {
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
      
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-cycling-blue">Rankings</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Top randonneur achievements and statistics
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => navigate('/statistics')}
        >
          <div className="bg-cycling-green/10 p-6 rounded-full">
            <ChartBar className="h-12 w-12 text-cycling-green" />
          </div>
          <h2 className="text-2xl font-semibold text-cycling-green">Statistics</h2>
          <p className="text-center text-muted-foreground">
            Overall community statistics, achievements, and milestones
          </p>
        </div>
        
        <div 
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => navigate('/events/1/results')}
        >
          <div className="bg-cycling-orange/10 p-6 rounded-full">
            <FileText className="h-12 w-12 text-cycling-orange" />
          </div>
          <h2 className="text-2xl font-semibold text-cycling-orange">Event Results</h2>
          <p className="text-center text-muted-foreground">
            Detailed results from individual randonneuring events
          </p>
        </div>
        
        <div 
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => navigate('/participants/p1')}
        >
          <div className="bg-cycling-blue/10 p-6 rounded-full">
            <Users className="h-12 w-12 text-cycling-blue" />
          </div>
          <h2 className="text-2xl font-semibold text-cycling-blue">Randonneur Profiles</h2>
          <p className="text-center text-muted-foreground">
            Participant histories, achievements, and personal statistics
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold text-cycling-green mb-4">Official Rankings</h2>
        <p className="mb-6">
          Randonneuring is primarily about personal achievement rather than competition. 
          However, we do recognize outstanding accomplishments within our community.
        </p>
        
        <div className="flex flex-col gap-4">
          <Button 
            variant="outline" 
            className="justify-start gap-2"
            onClick={() => navigate('/statistics')}
          >
            <Award className="h-4 w-4 text-cycling-orange" />
            Super Randonneur Awards
          </Button>
          
          <Button 
            variant="outline"
            className="justify-start gap-2"
            onClick={() => navigate('/statistics')}
          >
            <Activity className="h-4 w-4 text-cycling-orange" />
            Distance Achievement
          </Button>
          
          <Button 
            variant="outline"
            className="justify-start gap-2"
            onClick={() => navigate('/statistics')}
          >
            <Calendar className="h-4 w-4 text-cycling-orange" />
            Event Completion Rate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rankings;
