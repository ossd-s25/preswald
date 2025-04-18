import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const DebugPanel = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({});

  useEffect(() => {
    const handleDebugMessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.channel === '__debug__') {
        setState(msg.payload);
      }
    };

    const socket = new WebSocket('ws://localhost:8000/ws');
    socket.addEventListener('message', handleDebugMessage);

    return () => {
      socket.removeEventListener('message', handleDebugMessage);
      socket.close();
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
            <pre className="whitespace-pre-wrap">{JSON.stringify(state, null, 2)}</pre>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default DebugPanel;
