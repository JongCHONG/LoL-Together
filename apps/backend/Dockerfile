FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Compile TypeScript
RUN npm run build

ENV NODE_ENV=production

# Expose le port 4000 utilisé par ton serveur Express
EXPOSE 4000

CMD ["node", "dist/index.js"]
