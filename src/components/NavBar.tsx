
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import LanguageSwitcher from './LanguageSwitcher';

const NavBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-cycling-blue">{t('app.name')}</span>
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.home')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('nav.events')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <ListItem to="/brevets" title={t('nav.brevets')}>
                    {t('nav.brevets')}
                  </ListItem>
                  <ListItem to="/permanents" title={t('nav.permanents')}>
                    {t('nav.permanents')}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/clubs">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.clubs')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/routes">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.routes')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/rankings">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.rankings')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>{t('nav.resources')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem to="/cyclists" title={t('nav.cyclists')}>
                    {t('nav.cyclists')}
                  </ListItem>
                  <ListItem to="/rules" title={t('nav.rules')}>
                    {t('nav.rules')}
                  </ListItem>
                  <ListItem to="/how-to-participate" title={t('nav.howToParticipate')}>
                    {t('nav.howToParticipate')}
                  </ListItem>
                  <ListItem to="/blog" title={t('nav.blog')}>
                    {t('nav.blog')}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </Link>
          
          {/* Mobile menu button - would need to implement mobile menu */}
          <Button variant="outline" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
