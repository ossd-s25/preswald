'use client';

import React from 'react';

import { Separator } from '@/components/ui/separator';

const TopbarWidget = ({ branding = window.PRESWALD_BRANDING }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background -mx-8 sm:-mx-10 lg:-mx-12 shadow-sm  w-fill">
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
