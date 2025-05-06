
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Route, routes as allRoutes } from '@/data/routes';
import RouteCard from '@/components/RouteCard';
import RoutesFilters, { RouteFilters } from '@/components/RoutesFilters';
import RouteDetailsModal from '@/components/RouteDetailsModal';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const RoutesPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<RouteFilters>({
    searchTerm: '',
    distance: [0, 1500],
    difficulty: null,
    hasEvents: null,
  });
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = 6;

  // Apply filters to routes
  const filteredRoutes = useMemo(() => {
    return allRoutes.filter(route => {
      // Search term filter
      const searchMatch = !filters.searchTerm || 
        route.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        route.description?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        route.startPoint.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        route.endPoint.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      // Distance filter
      const distanceMatch = route.distance >= filters.distance[0] && 
        route.distance <= filters.distance[1];
      
      // Difficulty filter
      const difficultyMatch = !filters.difficulty || 
        route.difficulty === filters.difficulty;
      
      // Events filter
      const hasEventsMatch = filters.hasEvents === null || 
        (filters.hasEvents === true && route.eventIds.length > 0) ||
        (filters.hasEvents === false && route.eventIds.length === 0);
      
      return searchMatch && distanceMatch && difficultyMatch && hasEventsMatch;
    });
  }, [filters]);

  // Pagination
  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);
  const totalPages = Math.ceil(filteredRoutes.length / routesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (route: Route) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  const handleFilterChange = (newFilters: RouteFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

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
        <h1 className="text-4xl font-bold text-cycling-blue text-center">Routes Library</h1>
        <p className="text-lg text-muted-foreground mt-2 text-center">
          Explore official randonneuring routes for events and challenges
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Filter Routes</h2>
            <RoutesFilters onFilterChange={handleFilterChange} />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {filteredRoutes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-10 text-center">
              <h3 className="text-xl font-medium mb-2">No routes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
              <Button 
                onClick={() => handleFilterChange({
                  searchTerm: '',
                  distance: [0, 1500],
                  difficulty: null,
                  hasEvents: null
                })} 
                variant="outline" 
                className="mt-4"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Showing {indexOfFirstRoute + 1}-{Math.min(indexOfLastRoute, filteredRoutes.length)} of {filteredRoutes.length} routes
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentRoutes.map(route => (
                  <RouteCard 
                    key={route.id} 
                    route={route} 
                    onViewDetails={handleViewDetails} 
                  />
                ))}
              </div>
              
              {filteredRoutes.length > routesPerPage && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
                      .map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={page === currentPage}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    }
                    
                    {currentPage + 1 < totalPages && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
      
      <RouteDetailsModal 
        route={selectedRoute}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default RoutesPage;
