
## Basic node express nunjucks development environment

Live reload using nodemon and browser-sync

How to start? 
1. Install dependecies with <-- npm ci --> It is important to use npm ci instead of npm i or npm install. This will make sure that the packages are installed without vulnerabilities. (I am keen to maintain package-lock.json)

2. For development <-- npm run dev -->

3. For production <-- npm run build  -->  This will create a directory "dist" with code ready for deployment.

### Info
- This project has now Typescript for the server side JavaScript files
- Unit test with jest and jsdom


                                                                                
                       === npm audit security report ===                        
                                                                                
found 0 vulnerabilities
 in 1159 scanned packages

node -v 14.17.1
 npm -v 6.14.13 
 
### New Features
Dockerfile 

Do:

docker build -t nodefeminimal:v1  .
docker run -p 3001:8080 -d nodefeminimal:v1

Then go to:

http://0.0.0.0:3001/

### To do:
// Create some demos TDD 
// Create unit tests