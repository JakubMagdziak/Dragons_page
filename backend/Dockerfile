FROM node:18-alpine

WORKDIR /app

# Kopiujemy tylko pliki package.json i package-lock.json (lub yarn.lock)
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy cały kod źródłowy do kontenera
COPY . .

EXPOSE 4000

# Uruchamiamy backend
CMD ["node", "src/server.js"]
