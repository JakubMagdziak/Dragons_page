FROM node:18

WORKDIR /app

# Skopiuj tylko pliki zależności
COPY package*.json ./

# Instaluj zależności wewnątrz kontenera!
RUN npm install

# Skopiuj pozostałe pliki frontendowe
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
