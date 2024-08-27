'use client'
import React from 'react';
import { useState, useEffect } from 'react'
import { Link, usePathname }from "@/lib/i18n";
import { useRouter } from 'next/navigation'
import { Github, MenuIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import IconImage from "../../public/favicon.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ThemeModeButton } from "@/components/ThemeModeButton";
import { LocaleButton } from "@/components/LocaleButton";
import {useTranslations} from 'next-intl';

type categoriesType = {
  name: string,
  src: string,
  description: string,
  link: string
}

type navigationProp = {
  categories: categoriesType[]
}

export const Navigation = ({ categories }: navigationProp ) => {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations('navigation');

  const menuItems: {
    label: string;
    href: string;
  }[] = [
    {
      label: t('aiToolsBtn'),
      href: "/",
    },
    {
      label: t('digiToolsBtn'),
      href: "/digi-tools",
    },
    {
      label: t('articleBtn'),
      href: "/article",
    },
    {
      label: t('changelogBtn'),
      href: "/changelog",
    },
  ];

  const isMenuItemActive = (href: string) => {
    return pathname === href;
  };

  useEffect(() => {
    let isMounted = true;
    const checkLoginStatus = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        if (isMounted) setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkLoginStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false);
    };

    router.events?.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={IconImage} alt="DevToolset Logo" width={32} height={32} />
            <span className="hidden font-bold sm:inline-block">
              DevToolset
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/' === pathname && "font-extrabold")}>
                      {t('aiToolsBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/digi-tools" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/digi-tools' === pathname && "font-extrabold")}>
                      {t('digiToolsBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn('font-medium', '/article' === pathname && "font-extrabold")}>
                    {t('articleBtn')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Dev Toolset
                            </div>
                            <p className="text-xs leading-tight text-muted-foreground">
                              {t('articleDescription')}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/article/add-new-developer-tools" title="Add Tools">
                        {t('article1Title')}
                      </ListItem>
                      <ListItem href="/article/deploy-own-devtoolset" title="Deploy DevToolset">
                        {t('article2Title')}
                      </ListItem>
                      <ListItem href="/article" title={t('moreArticleBtn')} className='border border-muted  bg-gradient-to-b  from-muted/50 to-muted/20'>
                        {t('moreArticleDescription')}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/changelog" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'font-medium', '/changelog' === pathname && "font-extrabold")}>
                      {t('changelogBtn')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/submit-tool" className='hidden md:block'>
            <Button variant="outline" className='text-sm tracking-tight'>{t('submitToolBtn')}</Button>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeModeButton />
            <LocaleButton />
          </div>
          <a
            href="https://github.com/iamcorey/devtoolset"
            target="_blank"
            rel="noreferrer"
            className='hidden md:block'
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </a>
        </div>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setMobileMenuOpen}
            >
              <Image src={IconImage} alt="DevToolset Logo" width={32} height={32} />
              <span className="font-bold">DevToolset</span>
            </MobileLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {menuItems.map(
                  (item) =>
                    item.href && (
                      <MobileLink
                        key={item.href}
                        href={item.href}
                        onOpenChange={setMobileMenuOpen}
                      >
                        {item.label}
                      </MobileLink>
                    )
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-3 pt-6">
                  <Link href="/submit-tool" className=''>
                    <Button variant="outline" className='text-sm tracking-tight'>{t('submitToolBtn')}</Button>
                  </Link>
                  <a
                    href="https://github.com/iamcorey/devtoolset"
                    target="_blank"
                    rel="noreferrer"
                    className='flex items-center'
                  >
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                    <span className="ml-2">GitHub</span>
                  </a>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
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
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}