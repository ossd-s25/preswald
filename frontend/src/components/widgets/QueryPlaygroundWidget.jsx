import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { comm } from '@/utils/websocket';

const QueryPlaygroundWidget = ({ id, data_sources, active_source }) => {
  const [query, setQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState(active_source?.name || '');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  console.log(result);
  useEffect(() => {
    console.log('QueryPlayground initialized with:', { data_sources, active_source });

    // Listen for WebSocket messages containing query results
    const unsubscribe = comm.subscribe((message) => {
      if (message.type === 'state_update' && message.component_id === id) {
        console.log('[WebSocket] Query Result Received:', message.value);
        setResult(message.value);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [data_sources, active_source, id]);

  const runQuery = () => {
    setError(null);
    setResult(null);

    if (!query.trim()) {
      setError('Query cannot be empty.');
      return;
    }

    if (!selectedSource) {
      setError('No data source selected.');
      return;
    }

    try {
      // Send query via WebSockets
      comm.updateComponentState(id, { query, source: selectedSource });
      console.log('[WebSocket] Sent query:', { query, source: selectedSource });
    } catch (err) {
      setError('Failed to send query.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SQL Playground</CardTitle>
        <CardDescription>Select a data source and run SQL queries</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {/* Data Source Selection */}
        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Data Source" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(data_sources || {}).map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Query Input Field */}
        <Input
          className="w-full mt-4"
          placeholder="Enter SQL query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Run Query Button */}
        <Button className="w-full mt-4" onClick={runQuery}>
          Run Query
        </Button>
        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        Query Results Card
        {result && Array.isArray(result) && result.length > 0 && (
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle>Query Results</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table className="border border-gray-300">
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    {Object.keys(result[0]).map((key) => (
                      <TableHead key={key} className="border border-gray-300 px-4 py-2">
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.map((row, index) => (
                    <TableRow key={index} className="border border-gray-300">
                      {Object.values(row).map((value, idx) => (
                        <TableCell key={idx} className="border border-gray-300 px-4 py-2">
                          {String(value)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default QueryPlaygroundWidget;
