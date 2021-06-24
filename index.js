let express = require('express');
let nunjucks = require('nunjucks');
const path =require('path');

const app = express();
app.use(express.urlencoded({extended: true}));


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

app.post('/submitdata', (req, res) => {
    res.render('views/formdone', {
        name: req.body.username,
        surname: req.body.usersurname
    });  
});

app.all('*', (req,res) => {
    res.json({title: 'We are having an issue ... you should not be here.'})
});

app.listen(3000, () => {
    console.log('Server is up.');
});