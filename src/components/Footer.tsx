
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-cycling-blue">RandoTracker</h3>
            <p className="text-muted-foreground text-sm">
              The premier platform for randonneuring events, results, and community in Belarus.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Events</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/brevets" className="hover:text-cycling-blue transition-colors">Brevets</Link></li>
              <li><Link to="/permanents" className="hover:text-cycling-blue transition-colors">Permanents</Link></li>
              <li><Link to="/routes" className="hover:text-cycling-blue transition-colors">Routes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/clubs" className="hover:text-cycling-blue transition-colors">Clubs</Link></li>
              <li><Link to="/rankings" className="hover:text-cycling-blue transition-colors">Rankings</Link></li>
              <li><Link to="/statistics" className="hover:text-cycling-blue transition-colors">Statistics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Related Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.audax-club-parisien.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cycling-blue transition-colors">Audax Club Parisien</a></li>
              <li><a href="https://rusa.org/" target="_blank" rel="noopener noreferrer" className="hover:text-cycling-blue transition-colors">Randonneurs USA</a></li>
              <li><a href="https://audax-japan.org/" target="_blank" rel="noopener noreferrer" className="hover:text-cycling-blue transition-colors">Audax Japan</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} RandoTracker. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-cycling-blue">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-cycling-blue">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-cycling-blue">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
