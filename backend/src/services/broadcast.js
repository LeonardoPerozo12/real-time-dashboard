
let wssInstance = null;

/**
 * Set WebSocketServer instance to use for broadcasting
 * @param {WebSocketServer} wss
 */

export function setWss(wss) {
  wssInstance = wss;
}

/**
 * Broadcast a message to all connected clients
 * @param {string|object} message
 */
export function broadcast(message) {
  if (!wssInstance) {
    console.error("WebSocketServer instance not set for broadcast!");
    return;
  }

  const payload = typeof message === "string" ? { type: "broadcast", payload: message } : message;

  wssInstance.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
}
