# Real-time Dashboard

A real-time dashboard web application built with **React** on the frontend and **Node.js + Express + WebSocket (ws)** on the backend.  
It displays live stock data updates and demonstrates real-time data visualization with WebSockets.

---

## Features

- **Real-time Stock Data**: Receives live updates via WebSocket.
- **Responsive Dashboard**: Interactive charts and stats cards.
- **REST API**: Initial data fetching and health check endpoints.
- **Alerts & Notifications**: Simple in-memory alerts system.
- **WebSocket Client**: Persistent connection to server for live updates.

---

## Technology Stack

- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, ws (WebSocket)
- **Data Source**: TwelveData API for stock information

---

## Setup Instructions

1. **Clone the repository**

git clone <your-repo-url>
cd real-time-dashboard

2. **Install dependencies**

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. **Configure environment variables**

Create a `.env` file in `backend/`:

TWELVEDATA_API_KEY=your_api_key_here
PORT=3000(by default)

Create a `.env` file in `frontend/`:
VITE_BACKEND_ROUTE=backend_route

4. **Start the servers**

# Backend
cd backend
node src/server.js

# Frontend (in another terminal)
cd frontend
npm run dev

5. Open your browser at `http://localhost:5173` (or port shown by Vite) to see the dashboard.

---

## Testing

### REST API

- **Fetch initial stock data**

GET http://localhost:3000/api/stocks

- **Health check**

GET http://localhost:3000/api/health

### WebSocket

1. Connect to WebSocket at:

ws://localhost:3000

2. On connection, you will receive messages of the format:

{
  "type": "stock_update",
  "payload": {
    "symbol": "AAPL",
    "price": 255.46,
    "timestamp": "2025-09-26 15:59:00"
  }
}

---

## Alerts & Chat Messages Handling

- Alerts and chat messages are **stored in memory** in the backend for the duration of the server runtime.
- WebSocket broadcasts these updates to all connected clients.
- Example structure for alerts/messages:

{
  type: "alert",
  payload: {
    message: "Stock AAPL exceeded threshold!",
    timestamp: "2025-09-26T15:59:00Z"
  }
}

- Since storage is in-memory, all data is **lost if the server restarts**. This can be later replaced with a persistent database if needed.

---

## Notes

- The TwelveData API has a free limit of **8 requests per minute**. The backend is configured to respect this limit.
- Multiple stock symbols can be added by extending `getStockData()` and adjusting the broadcast interval.

---

## Future Improvements

- Store alerts and chat messages in a database (e.g., MongoDB) for persistence.
- Add user authentication to manage multiple dashboards.
- Implement dynamic stock selection from the frontend.
- Add historical charts for better trend visualization.

---

## License

MIT License
