import WebSocket, { Server as WebSocketServer } from 'ws';

interface WebSocketClient {
  id: string;
  socket: WebSocket;
}

class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocketClient>;

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.clients = new Map();

    this.wss.on('connection', (socket: WebSocket) => this.handleConnection(socket));

    console.log(`WebSocket server is running on ws://localhost:${port}`);
  }

  /**
   * Handle a new WebSocket connection.
   * @param socket - The WebSocket instance for the new connection.
   */
  private handleConnection(socket: WebSocket): void {
    const clientId = this.generateClientId();

    // Add the client to the list of connected clients
    const client: WebSocketClient = { id: clientId, socket };
    this.clients.set(clientId, client);

    console.log(`Client connected: ${clientId}`);

    // Handle incoming messages from the client
    socket.on('message', (message) => this.handleMessage(clientId, message.toString()));

    // Handle client disconnection
    socket.on('close', () => this.handleDisconnection(clientId));

    // Notify the client of a successful connection
    this.sendMessage(clientId, { type: 'connection', message: 'Connected to WebSocket server' });
  }

  /**
   * Handle a client disconnection.
   * @param clientId - The ID of the disconnected client.
   */
  private handleDisconnection(clientId: string): void {
    this.clients.delete(clientId);
    console.log(`Client disconnected: ${clientId}`);
  }

  /**
   * Handle incoming messages from a client.
   * @param clientId - The ID of the client sending the message.
   * @param message - The received message.
   */
  private handleMessage(clientId: string, message: string): void {
    console.log(`Message received from ${clientId}: ${message}`);

    // Example: Echo the message back to the client
    this.sendMessage(clientId, { type: 'echo', message });
  }

  /**
   * Send a message to a specific client.
   * @param clientId - The ID of the client.
   * @param payload - The message payload to send.
   */
  public sendMessage(clientId: string, payload: Record<string, unknown>): void {
    const client = this.clients.get(clientId);

    if (client) {
      client.socket.send(JSON.stringify(payload));
    } else {
      console.error(`Client with ID ${clientId} not found`);
    }
  }

  /**
   * Broadcast a message to all connected clients.
   * @param payload - The message payload to broadcast.
   */
  public broadcastMessage(payload: Record<string, unknown>): void {
    for (const client of this.clients.values()) {
      client.socket.send(JSON.stringify(payload));
    }
  }

  /**
   * Generate a unique client ID.
   * @returns A unique client ID.
   */
  private generateClientId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

export default WebSocketService;

