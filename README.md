# Real-time Dashboard

A real-time stock dashboard web application built with **React (Vite)** on the frontend and **Node.js + Express + WebSocket (ws)** on the backend.  

It displays **live stock price updates**, fetched from the TwelveData API, and demonstrates **real-time visualization with WebSockets**.
Disconnect & Reconnect

Users can safely disconnect and reconnect from the live data stream without breaking the dashboard:
---

## Features

- **Real-time Stock Data**: Live updates via WebSocket.  
- **Responsive Dashboard**: Charts & stats built with Tailwind CSS + Chart.js.  
- **REST API**: Fetch initial stock data and health checks.  
- **Alerts & Notifications**: In-memory alerts broadcast to all clients.  
- **WebSocket Client**: Persistent live data stream.  
- **Dockerized**: Run with Docker Compose for dev/prod.  
- **Deployment-ready**: Configured for Railway (or any Docker host).  

---

## Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, Chart.js  
- **Backend**: Node.js, Express, ws (WebSocket)  
- **Data Source**: TwelveData API (stock info)  
- **Infra**: Docker, Docker Compose, Railway  

---

## Setup Instructions

### 1. Clone the repository
git clone <your-repo-url>
cd real-time-dashboard

### 2. Install dependencies (local dev mode)
#### Backend
cd backend
npm install
#### Frontend
cd ../frontend
npm install

### 3. Configure environment variables

#### Backend (`backend/.env`)
TWELVEDATA_API_KEY=your_api_key_here
PORT=your_port_here(3000 by default)


#### Frontend (`frontend/.env`)
VITE_BACKEND_HTTP=http://your_backend_route:PORT
VITE_BACKEND_WS=ws://your_backend_route:PORT

### 4. Run locally

#### Backend
cd backend
npm run dev
#### Frontend (separate terminal)
cd frontend
npm run dev
Frontend will be available at [http://localhost:5173](http://localhost:5173).  

---

## Run with Docker

### Build & run with Docker Compose
docker compose up --build

- Frontend: http://localhost  
- Backend: http://localhost:3000  

Docker Compose uses **`docker-compose.yml`** to wire both services together.  

---

## API & WebSocket Testing

### REST Endpoints
All backend endpoints are prefixed with `/api` (if configured; otherwise as is):

| Endpoint         | Method | Query / Body                                      | Description                                                      | Example Request                                                                                         |
| ---------------- | ------ | ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `/stocks`        | GET    | `symbol=AAPL`                                     | Fetch current stock data for the given symbol.                   | `GET http://localhost:3000/stocks?symbol=AAPL`                                                          |
| `/symbol_search` | GET    | `query=AA`                                        | Search for stock symbols matching the query.                     | `GET http://localhost:3000/symbol_search?query=AA`                                                      |
| `/api/broadcast` | POST   | `{ "message": "Stock AAPL exceeded threshold!" }` | Send a broadcast message to all connected clients via WebSocket. | `POST http://localhost:3000/api/broadcast` <br> Body: `{ "message": "Stock AAPL exceeded threshold!" }` |



  {
     "message": "Server will be down for maintenance in 30 minutes"
  }

### WebSocket
- Connect to: ws://your_backend_route:PORT
 On connection, you receive real-time messages of the form:
```json
{
  "type": "stock_update",
  "payload": {
    "symbol": "AAPL",
    "price": 255.46,
    "timestamp": "2025-09-26 15:59:00"
  }
}
```
