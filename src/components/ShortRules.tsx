
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShortRules = () => {
  const { t } = useTranslation();
  
  const rules = t('home.rules.rulesList', { returnObjects: true });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-cycling-blue">{t('home.rules.title')}</h2>
        
        <div className="mb-6">
          <p className="mb-4">
            {t('home.rules.intro')}
          </p>
          <p className="text-cycling-green font-medium mb-4">
            {t('home.rules.keyRules')}
          </p>
        </div>
        
        <ul className="space-y-3 mb-6">
          {Array.isArray(rules) && rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-cycling-green mt-0.5 shrink-0" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <Button asChild variant="default" className="mt-2">
            <Link to="/rules">{t('home.rules.learnMore')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShortRules;
