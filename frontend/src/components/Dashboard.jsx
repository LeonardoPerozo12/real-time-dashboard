import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import StockChart from "./StockChart";
import ConnectionStatus from "./ConnectionStatus";

const Dashboard = forwardRef(({ symbol, onStockUpdate }, ref) => {
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(false);
  const [paused, setPaused] = useState(false);

  const wsRef = useRef(null);
  const reconnectRef = useRef(null);
  const manuallyPausedRef = useRef(false);
  const lastUpdateRef = useRef(0);

  // Function to establish WebSocket connection
  const connectWebSocket = () => {
    if (!symbol) return;

    if (wsRef.current) wsRef.current.close();

    const ws = new WebSocket(import.meta.env.VITE_BACKEND_WS);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ type: "set_symbol", payload: { symbol } }));
    };

    ws.onclose = () => {
      setConnected(false);
      // Reconnect automatically if not paused manually
      if (!paused && !manuallyPausedRef.current) {
        reconnectRef.current = setTimeout(connectWebSocket, 5000);
      }
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Handle stock update messages
      if (message.type === "stock_update" && message.payload.symbol === symbol) {
        const now = Date.now();
        if (now - lastUpdateRef.current < 30000) return; // throttle updates to 30s
        setData(prev => [...prev.slice(-49), message.payload]);
        onStockUpdate?.(message.payload);
        lastUpdateRef.current = now;
      }

      // Handle broadcast messages 
      if (message.type === "broadcast") {
        console.log("Broadcast message:", message.payload);
        // You could call a toast provider here
      }
    };
  };

  // Imperative methods to control the Dashboard from the parent
  useImperativeHandle(ref, () => ({
    clearData: () => {
      setData([]);
      setPaused(true);
      manuallyPausedRef.current = true;
      if (wsRef.current) wsRef.current.close();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      onStockUpdate?.(null);
    },
    pause: () => {
      setPaused(true);
      manuallyPausedRef.current = true;
      if (wsRef.current) wsRef.current.close();
    },
    resume: () => {
      setPaused(false);
      manuallyPausedRef.current = false;
      connectWebSocket();
    }
  }));

  // Initial data fetch when the symbol changes
  useEffect(() => {
    if (!symbol) return;

    setPaused(false);
    setData([]);

    fetch(`${import.meta.env.VITE_BACKEND_HTTP}/api/stocks?symbol=${symbol}`)
      .then(res => res.json())
      .then(initialData => {
        setData([initialData]);
        onStockUpdate?.(initialData);
        lastUpdateRef.current = Date.now();
      })
      .catch(console.error);
  }, [symbol]);

  // WebSocket connection management
  useEffect(() => {
    if (!symbol || paused) return;

    connectWebSocket();

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
      setConnected(false);
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, [symbol, paused]);

  return (
    <div className="flex flex-col h-full w-full">
      <ConnectionStatus connected={connected && !paused} />
      <StockChart data={data} />
    </div>
  );
});

export default Dashboard;
