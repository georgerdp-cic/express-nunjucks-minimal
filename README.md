
## Basic node express nunjucks development environment

Live reload using nodemon and browser-sync

How to start? 
1. Install dependecies with <-- npm ci --> It is important to use npm ci instead of npm i or npm install. This will make sure that the packages are installed without vulnerabilities. (I am keen to maintain package-lock.json)

2. For development <-- npm run dev -->

3. For production <-- npm run build  -->  This will create ai directory .dist with everything ready.

### Info
- This project has now Typescript for the server side files, nodemon and Tslint configured
- Unit test with jest and jsdom

### New Features
Dockerfile 

Do:

docker build -t nodefeminimal:v1  .
docker run -p 3001:8080 -d nodefeminimal:v1

Then go to:

http://0.0.0.0:3001/

### To do:


// Set up the lint process
// Create some demos TDD 
// Create unit tests