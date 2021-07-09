
//Imports
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import nunjucks from 'nunjucks';
import path from 'path';
import indexRoute from './routes';

//Constants
const isDev = process.env.NODE_ENV === 'development';
const app = express();

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
app.use('/', indexRoute);

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

process.once('SIGUSR2', function () { process.kill(process.pid, 'SIGUSR2'); });
