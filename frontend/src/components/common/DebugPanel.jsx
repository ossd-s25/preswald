import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { comm } from '@/utils/websocket';

const DebugPanel = () => {
  const [visible, setVisible] = useState(false);
  const [debugState, setDebugState] = useState({});

  useEffect(() => {
    const unsubscribe = comm.subscribe((payload) => {
      if (payload.type === '__debug__') {
        // Only process messages with type "__debug__"
        console.log('[DebugPanel] Received debug state:', payload);
        setDebugState(payload.payload); // Use the "payload" field for the debug state
      }
    });

    comm.connect();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setVisible(!visible)} className="mb-2">
        {visible ? 'Hide Debug' : 'Show Debug'}
      </Button>
      {visible && (
        <Card className="w-[400px] h-[500px] overflow-hidden shadow-lg border bg-white dark:bg-gray-900 text-sm">
          <ScrollArea className="p-4 h-full">
            <pre className="whitespace-pre-wrap">{JSON.stringify(debugState, null, 2)}</pre>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default DebugPanel;
