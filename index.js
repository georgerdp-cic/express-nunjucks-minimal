let express = require('express');
let nunjucks = require('nunjucks');
const path =require('path');

const app = express();

nunjucks.configure(path.resolve(__dirname, 'templates') ,{
    autoescape: true,
    express: app
 });

app.set("view engine", "njk");


app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server is up.');
});