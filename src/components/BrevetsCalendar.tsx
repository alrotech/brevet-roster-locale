
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { Brevet } from '@/data/brevets';
import { cn } from '@/lib/utils';

interface BrevetsCalendarProps {
  brevets: Brevet[];
  currentMonth: Date;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

const BrevetsCalendar: React.FC<BrevetsCalendarProps> = ({ 
  brevets,
  currentMonth,
  selectedDate,
  setSelectedDate
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Days of the week
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Check if a specific day has events
  const hasEventsOnDay = (day: Date) => {
    return brevets.some(brevet => 
      isSameDay(parseISO(brevet.date), day)
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Calendar header with days of the week */}
      <div className="grid grid-cols-7 bg-cycling-blue text-white font-semibold">
        {weekdays.map((day, index) => (
          <div key={index} className="p-1 text-center text-xs">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {monthDays.map((day, i) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const hasEvents = hasEventsOnDay(day);
          
          return (
            <div
              key={i}
              className={cn(
                "h-12 p-1 border border-muted flex flex-col items-center justify-start",
                isToday && "bg-muted",
                !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                isSelected && "calendar-day-selected"
              )}
              onClick={() => setSelectedDate(day)}
            >
              <span className={cn(
                "inline-flex items-center justify-center w-6 h-6 rounded-full text-xs",
                isToday && "bg-cycling-blue text-white",
                isSelected && !isToday && "bg-cycling-green text-white",
                hasEvents && !isSelected && !isToday && "calendar-day-has-events",
                "cursor-pointer hover:bg-cycling-light-blue hover:text-white transition-colors"
              )}>
                {format(day, 'd')}
              </span>
              
              {hasEvents && (
                <div className="w-2 h-2 bg-cycling-light-blue rounded-full mt-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrevetsCalendar;
