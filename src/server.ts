import express from 'express';
let nunjucks = require('nunjucks');
const path =require('path');

const app = express();
app.use(express.urlencoded({extended: true}));

if (process.env.NODE_ENV) {
    console.log('[DEBUG] Is development environment', process.env.NODE_ENV === 'development');
}

nunjucks.configure(path.join(__dirname, '../templates'),{
    autoescape: true,
    express: app,
    watch: process.env.NODE_ENV === 'development'
 });

app.set("view engine", "njk");

app.get('/', function (req: any ,res: any) {
    res.render('views/index', {
        pageTitle: 'Welcome test page',
        headerBodyText: 'This is header body text',
        email: 'georgerdp@gmail.com',
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

app.post('/submitdata',  (req: any ,res: any) => {
    res.render('views/formdone', {
        name: req.body.username,
        surname: req.body.usersurname
    });  
});

app.all('*', (req: any ,res: any) => {
    res.json({title: 'We are having an issue ... you should not be here.'})
});

app.listen(8080, () => {
    console.log('Server is up.');
});