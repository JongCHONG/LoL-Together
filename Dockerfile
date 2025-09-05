FROM node:20-alpine

WORKDIR /app

# Copie uniquement les fichiers du backend
COPY ./apps/backend/package*.json ./
COPY ./apps/backend/tsconfig.json ./
COPY ./apps/backend/src ./src

RUN npm install

# Compile TypeScript (assume que ton backend build vers /dist)
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]
