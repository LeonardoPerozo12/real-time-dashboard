FROM node:20-alpine AS build

ARG VITE_BACKEND_HTTP
ARG VITE_BACKEND_WS
ENV VITE_BACKEND_HTTP=${VITE_BACKEND_HTTP}
ENV VITE_BACKEND_WS=${VITE_BACKEND_WS}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
