
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
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if a specific day has events
  const hasEventsOnDay = (day: Date) => {
    return brevets.some(brevet => 
      isSameDay(parseISO(brevet.date), day)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Calendar header with days of the week */}
      <div className="grid grid-cols-7 bg-cycling-blue text-white font-semibold">
        {weekdays.map((day, index) => (
          <div key={index} className="p-2 text-center">
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
                "h-16 p-1 border border-muted flex flex-col items-center justify-start",
                isToday && "bg-muted",
                !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                isSelected && "calendar-day-selected"
              )}
              onClick={() => setSelectedDate(day)}
            >
              <span className={cn(
                "inline-flex items-center justify-center w-7 h-7 rounded-full text-sm",
                isToday && "bg-cycling-blue text-white",
                isSelected && !isToday && "bg-cycling-green text-white",
                hasEvents && !isSelected && !isToday && "calendar-day-has-events",
                "cursor-pointer hover:bg-cycling-light-blue hover:text-white transition-colors"
              )}>
                {format(day, 'd')}
              </span>
              
              {hasEvents && (
                <div className="w-full mt-1">
                  {brevets
                    .filter(brevet => isSameDay(parseISO(brevet.date), day))
                    .slice(0, 1)
                    .map(brevet => (
                      <div 
                        key={brevet.id}
                        className="text-xs truncate text-center bg-cycling-light-blue rounded px-1 py-0.5"
                      >
                        {brevet.distance}k
                      </div>
                    ))}
                  
                  {/* Show count if more than 1 event */}
                  {brevets.filter(brevet => isSameDay(parseISO(brevet.date), day)).length > 1 && (
                    <div className="text-xs text-center mt-0.5 text-muted-foreground">
                      +{brevets.filter(brevet => isSameDay(parseISO(brevet.date), day)).length - 1} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrevetsCalendar;
