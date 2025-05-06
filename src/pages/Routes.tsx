
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Routes = () => {
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
        <h1 className="text-4xl font-bold text-cycling-blue">Routes</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore randonneuring routes and maps
        </p>
      </header>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-center py-8">
          This page will contain a library of randonneuring routes.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => navigate('/')}>
            Go to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Routes;
