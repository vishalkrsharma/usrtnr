'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '@/constants/nav-links';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Link } from '@/components/ui/link';

const NavLinksSheet = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const sheetTouchStartX = useRef<number | null>(null);

  // Attach this to a full-screen invisible div on the left edge
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    // Only start if touch is within 64px of the left edge
    if (touch.clientX < 64) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.touches[0];
    // If swiped right more than 50px, open the sheet
    if (touch.clientX - touchStartX.current > 50) {
      setOpen(true);
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  // For closing sheet on swipe left
  const handleSheetTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    sheetTouchStartX.current = touch.clientX;
  };

  const handleSheetTouchMove = (e: React.TouchEvent) => {
    if (sheetTouchStartX.current === null) return;
    const touch = e.touches[0];
    // If swiped left more than 50px, close the sheet
    if (sheetTouchStartX.current - touch.clientX > 50) {
      setOpen(false);
      sheetTouchStartX.current = null;
    }
  };

  const handleSheetTouchEnd = () => {
    sheetTouchStartX.current = null;
  };

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Invisible swipe area on the left edge */}
      <div
        className='fixed top-16 left-0 w-16 h-screen z-50'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger className='md:hidden'>
          <Menu className='mt-px text-primary' />
        </SheetTrigger>
        <SheetContent
          side='left'
          onTouchStart={handleSheetTouchStart}
          onTouchMove={handleSheetTouchMove}
          onTouchEnd={handleSheetTouchEnd}
        >
          <SheetHeader>
            <SheetTitle>
              <Link
                href='/'
                className='font-black text-2xl px-0'
              >
                usrtnr
              </Link>
            </SheetTitle>
            <SheetDescription className='text-xs'>
              A modern URL shortener that transforms long web addresses into short, memorable, and shareable links with ease.
            </SheetDescription>
          </SheetHeader>
          <div className='space-y-4 mx-4'>
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={cn('font-normal block', pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground')}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavLinksSheet;
