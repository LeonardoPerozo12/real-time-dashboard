import React, { useEffect, useState } from "react";
import StockChart from "./StockChart";
import ConnectionStatus from "./ConnectionStatus";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [connected, setConnected] = useState(false);

  // Fetch initial stock data when component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/stocks`)
      .then((res) => res.json())
      .then((initialData) => setData([initialData]));
  }, []);

  // WebSocket connection with automatic reconnection
  useEffect(() => {
    let ws;

    const connect = () => {
      ws = new WebSocket(`ws://${import.meta.env.VITE_BACKEND_ROUTE}`);

      ws.onopen = () => setConnected(true);

      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 3000);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "stock_update") {
          setData((prev) => [...prev.slice(-49), message.payload]);
        }
      };
    };

    connect();

    return () => ws.close();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <ConnectionStatus connected={connected} />
        <StockChart data={data} />
    </div>
  );
};

export default Dashboard;
