// Dashboard.jsx
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

  useImperativeHandle(ref, () => ({
    clearData: () => {
      console.log("Clearing & pausing Dashboard...");
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
      console.log("Resuming Dashboard...");
      setPaused(false);
      manuallyPausedRef.current = false; 
    }
  }));

  useEffect(() => {
    if (!symbol) return;

    if (manuallyPausedRef.current) manuallyPausedRef.current = false; // desbloquea clear

    setPaused(false);
    setData([]);
    fetch(`${import.meta.env.VITE_BACKEND_HTTP}/api/stocks?symbol=${symbol}`)
      .then(res => res.json())
      .then(initialData => {
        setData([initialData]);
        onStockUpdate?.(initialData);
      })
      .catch(console.error);
  }, [symbol]);

  // WebSocket
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
          setData(prev => [...prev.slice(-49), message.payload]);
          onStockUpdate?.(message.payload);
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
