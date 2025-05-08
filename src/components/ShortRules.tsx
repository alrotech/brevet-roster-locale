
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShortRules = () => {
  const rules = [
    "Complete the full route within the time limit based on distance",
    "Visit all checkpoints (controls) along the route to get your brevet card stamped",
    "Carry required equipment: lights, reflective gear, and safety essentials",
    "Be self-sufficient – support vehicles are not allowed on the route",
    "Follow traffic laws and ride safely at all times",
    "Participants must maintain a minimum average speed of 13.5 km/h"
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-cycling-blue">Randonneuring Essentials</h2>
        
        <div className="mb-6">
          <p className="mb-4">
            Randonneuring is a long-distance cycling discipline focusing on self-sufficiency, endurance, and camaraderie rather than competition.
            Riders must complete routes of 200km to 1200km within specified time limits, collecting proof of passage at designated control points.
          </p>
          <p className="text-cycling-green font-medium mb-4">
            Key rules every randonneur should know:
          </p>
        </div>
        
        <ul className="space-y-3 mb-6">
          {rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-cycling-green mt-0.5 shrink-0" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <Button asChild variant="default" className="mt-2">
            <Link to="/rules">Learn More About Randonneuring</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShortRules;
