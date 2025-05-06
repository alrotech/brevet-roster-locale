
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addMonths, subMonths } from 'date-fns';

interface CalendarHeaderProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, setCurrentMonth }) => {
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-cycling-blue">
        {format(currentMonth, 'MMMM yyyy')}
      </h2>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(new Date())}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
