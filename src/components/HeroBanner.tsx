
'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Award, Book } from 'lucide-react';

const HeroBanner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative bg-gradient-to-r from-cycling-green/90 to-cycling-blue/90 text-white rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/62a3c193-2cdc-4799-a5ae-8574356cb7b4.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('home.hero.title')}</h1>
          <p className="text-xl mb-8">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" variant="default" className="bg-white text-cycling-blue hover:bg-white/90">
              <Link href="/brevets">{t('home.hero.findEvents')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link href="/how-to-participate">{t('home.hero.getStarted')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
