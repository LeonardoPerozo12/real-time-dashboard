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

  useImperativeHandle(ref, () => ({
    clearData: () => {
      setData([]);
      setPaused(true);
      manuallyPausedRef.current = true;
      setConnected(false);

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      onStockUpdate?.(null);
    },
    resume: () => {
      setPaused(false);
      manuallyPausedRef.current = false;
    }
  }));

  useEffect(() => {
    if (!symbol) return;

    if (manuallyPausedRef.current) manuallyPausedRef.current = false;

    setPaused(false);
    setData([]);

    const now = Date.now();
    if (now - lastUpdateRef.current < 30000) return; // ignora si pasó <30s

    fetch(`${import.meta.env.VITE_BACKEND_HTTP}/api/stocks?symbol=${symbol}`)
      .then(res => res.json())
      .then(initialData => {
        setData([initialData]);
        onStockUpdate?.(initialData);
        lastUpdateRef.current = Date.now();
      })
      .catch(console.error);
  }, [symbol]);

  // websocket connection with throttle
  useEffect(() => {
    if (!symbol || paused) return;

    const connect = () => {
      if (wsRef.current) wsRef.current.close();

      const ws = new WebSocket(import.meta.env.VITE_BACKEND_WS);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        ws.send(JSON.stringify({ type: "set_symbol", payload: { symbol } }));
      };

      ws.onclose = () => {
        setConnected(false);
        if (!paused && !manuallyPausedRef.current) {
          reconnectRef.current = setTimeout(connect, 5000);
        }
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "stock_update" && message.payload.symbol === symbol) {
          const now = Date.now();
          if (now - lastUpdateRef.current < 30000) return; 
          
          setData(prev => [...prev.slice(-49), message.payload]);
          onStockUpdate?.(message.payload);
          lastUpdateRef.current = now;
        }
      };
    };

    connect();

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
