FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build-server
EXPOSE 3000
CMD ["node", "dist/server.js"]
