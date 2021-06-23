let express = require('express');
let nunjucks = require('nunjucks');
const path =require('path');

const app = express();

nunjucks.configure(path.resolve(__dirname, 'templates') ,{
    autoescape: true,
    express: app,
    watch: true
 });

app.set("view engine", "njk");


app.get('/', function(req, res) {
    res.render('index', {
        pageTitle: 'Welcome test page',
        headerBodyText: 'This is header body text',
        featList: [
            {
                name: 'test',
                desc: 'does this and that'
            },            {
                name: 'test2',
                desc: 'does this and that'
            },
            {
                name: 'test3',
                desc: 'does this and that'
            }
        ]
    });
});

app.listen(3000, () => {
    console.log('Server is up.');
});