import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import fetch from 'node-fetch'; // Ensure this is installed: yarn add node-fetch

const CLI: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/metrics'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch metrics: ${response.statusText}`);
        }
        const data = await response.json();
        setMetrics(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchMetrics();
  }, []);

  if (error) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red">❌ Error: {error}</Text>
      </Box>
    );
  }

  if (!metrics) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="yellow">⏳ Loading metrics...</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan">📊 System Metrics</Text>
      <Box borderStyle="round" borderColor="green" padding={1}>
        <Text>🔥 CPU Usage: {metrics.cpu}%</Text>
        <Text>🧠 Memory Usage: {metrics.memory} MB</Text>
        <Text>👥 Active Users: {metrics.activeUsers}</Text>
      </Box>
    </Box>
  );
};

// Render the CLI
render(<CLI />);
