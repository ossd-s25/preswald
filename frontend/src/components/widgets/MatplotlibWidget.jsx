import React from 'react';

import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

const MatplotlibWidget = ({
  _label,
  className,
  _size = 'default', // "sm", "default", "lg"
}) => {
  return <Card className={cn('w-full', className)}>matplotlib widget</Card>;
};

export default HelloWorldWidget;
