FROM node:12.22.1-buster-slim

# Create working directory  
WORKDIR /usr/src/exserv

COPY package*.json .

RUN npm install

COPY . . 

# Expose port 8080
EXPOSE 8080

CMD ["node", "dist/server.js"]