
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarDays, MapPin, Award, Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const QuickLinks = () => {
  const { t } = useTranslation();
  
  const links = [
    {
      title: t('home.quickLinks.eventsCalendar.title'),
      description: t('home.quickLinks.eventsCalendar.description'),
      icon: <CalendarDays className="h-8 w-8 text-cycling-blue" />,
      to: "/brevets",
    },
    {
      title: t('home.quickLinks.routes.title'),
      description: t('home.quickLinks.routes.description'),
      icon: <MapPin className="h-8 w-8 text-cycling-green" />,
      to: "/routes",
    },
    {
      title: t('home.quickLinks.rankings.title'),
      description: t('home.quickLinks.rankings.description'),
      icon: <Award className="h-8 w-8 text-cycling-orange" />,
      to: "/rankings",
    },
    {
      title: t('home.quickLinks.rules.title'),
      description: t('home.quickLinks.rules.description'),
      icon: <Book className="h-8 w-8 text-cycling-blue" />,
      to: "/rules",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {links.map((link, index) => (
        <Link key={index} to={link.to}>
          <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                {link.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-cycling-blue">{link.title}</h3>
              <p className="text-muted-foreground">{link.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
