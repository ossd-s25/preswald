import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// ✅ Use Input instead of Textarea

const QueryPlaygroundWidget = ({ id, data_sources, active_source }) => {
  const [query, setQuery] = useState('');

  // Debugging: Log received props
  useEffect(() => {
    console.log('QueryPlayground initialized with:', { data_sources, active_source });
  }, [data_sources, active_source]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SQL Playground</CardTitle>
        <CardDescription>Select a data source and run SQL queries</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {/* Query Input Field (Using Input instead of Textarea) */}
        <Input
          className="w-full mt-4"
          placeholder="Enter SQL query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Run Query Button (Does nothing for now) */}
        <Button className="w-full mt-4">Run Query</Button>

        {/* Debugging Output */}
        <pre className="mt-4 p-2 bg-gray-100 rounded-md text-sm">
          <strong>data_sources:</strong> {JSON.stringify(data_sources, null, 2)}
        </pre>

        <pre className="mt-4 p-2 bg-gray-100 rounded-md text-sm">
          <strong>active_source:</strong> {JSON.stringify(active_source, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};

export default QueryPlaygroundWidget;
