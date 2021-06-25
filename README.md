
## Basic node express nunjucks development environment

Live reload using nodemon

How to start? 
1. npm i 

2. npm run dev or npm run start

3. Go to http://localhost:3000/

### Info
- This project has now TYPESCRIPT and TSLINT configured
- Example of macros, template extension and includes (see template folder)
- Now there is a form demo 

### New Features
Dockerfile 

Do:

docker build -t nodenun:v1 .  
docker run -p 3001:8080 -d nodenun:v1

Then go to:

http://0.0.0.0:3001/