
//Imports
const express = require("express");
const csurf = require("csurf");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const path = require('path');

//Constants
const isDev = process.env.NODE_ENV === 'development';
const app = express();
const csrfP = csurf({ cookie: true });

//Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'Secrets should go in environment variables. I guess you know that already.',
    resave: true,
    cookie: { secure: false, httpOnly: true },
    saveUninitialized: false
}));

//Serve static files
app.use(express.static(path.join(__dirname + '/public')));

//Template engine configuration
nunjucks.configure(isDev ? path.join(__dirname, '../templates') : path.join(__dirname, './templates'), {
    autoescape: true,
    express: app,
    watch: isDev
});

app.set("view engine", "njk");


//Routes 
app.get('/', csrfP, function (req: any, res: any) {

    res.render('views/index', {
        pageTitle: 'Welcome',
        headerBodyText: 'This is header body text',
        email: 'georgerdp@gmail.com',
        cToken: req.csrfToken(),
        featList: [
            {
                name: 'test',
                desc: 'does this and that'
            }, {
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

app.post('/submitdata', csrfP, (req: any, res: any) => {
    res.render('views/formdone', {
        name: req.body.username,
        surname: req.body.usersurname
    });
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403)
    res.send('Something is wrong.');
});

app.all('*', (req: any, res: any) => {
    res.json({ title: '(Something is wrong. Template with back button would be useful here)' })
});

app.listen(8080, () => {
    const message = process.env.NODE_ENV === 'development' ? 'DEV' : 'production';
    console.log(`[Info] Server running in ${message} environment`);
});

process.once('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2'));