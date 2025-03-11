'use client';

import { Menu, PanelLeft, PanelLeftClose } from 'lucide-react';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

const TopbarWidget = ({
  branding = window.PRESWALD_BRANDING, // default to PRESWALD_BRANDING if nothing is passed
}) => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Separator */}
      <Separator orientation="vertical" className="h-6 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Mobile branding */}
          <div className="flex lg:hidden items-center">
            <img
              className="h-8 w-8"
              src={`${branding?.logo}?timstamp=${new Date().getTime()}`}
              alt={branding?.name}
            />
            <span className="ml-3 text-lg font-semibold">{branding?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopbarWidget;
