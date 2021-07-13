
## Basic node express nunjucks development environment

Live reload using nodemon and browser-sync

How to start? 
1. npm i 

2. npm run dev

3 .npm run build / npm run start

### Info
- This project has now Typescript, nodemon and Tslint configured
- Unit test with jest and jsdom
### New Features
Dockerfile 

Do:

docker build -t nodefeminimal:v1  .
docker run -p 3001:8080 -d nodefeminimal:v1

Then go to:

http://0.0.0.0:3001/

### To do:

// Generate minified, uglified, transpiled client javascript code
// Set up the lint process
// Create some demos TDD 
// Create unit tests