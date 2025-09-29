import React, { useEffect, createContext } from "react";
import { Toaster, toast } from "react-hot-toast";

// create a context for toasts so any component can use it (just in case)
export const ToastContext = createContext({});

const ToastProvider = ({ wsUrl, children }) => {
  useEffect(() => {
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("Connected to WebSocket server for toasts");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "broadcast") {
          toast(data.payload, { duration: 5000 });
        }
      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => socket.close();
  }, [wsUrl]);

  return (
    <ToastContext.Provider value={{}}>
      {children}
      <Toaster position="top-right" />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
