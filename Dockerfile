FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Deliberately insecure configuration for scanner testing.
USER root
CMD ["node", "src/server.js"]
