FROM node:12.22.1-buster-slim

# Create working directory  
WORKDIR /usr/src/exserv

COPY package.json ./

RUN npm install

COPY ./dist ./

# Expose port 8080
EXPOSE 8080

CMD ["node", "server.js"]