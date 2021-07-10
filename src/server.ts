
//Imports
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import nunjucks from 'nunjucks';
import path from 'path';
import indexRoute from './routes';

//Interfaces

interface IPaths {
   templates: {
       dev: string;
       prod: string;
   }  
};

//Constants
const isDev = process.env.NODE_ENV === 'development';

const paths: IPaths = {
    templates: {
        dev: path.join(__dirname, '../templates'),
        prod: path.join(__dirname, './templates')
    }
};

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
nunjucks.configure(isDev ? paths.templates.dev : paths.templates.prod, {
    autoescape: true,
    express: app,
    watch: isDev
});

app.set("view engine", "njk");

//Routes 
app.use('/', indexRoute);

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err?.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403)
    res.send('Something is wrong.');
});

app.all('*', (req: express.Request, res: express.Response) => {
    res.json({ title: '(Something is wrong. Template with back button would be useful here)' })
});

app.listen(8080, () => {
    const message = process.env.NODE_ENV === 'development' ? 'DEV' : 'production';
    console.log(`[Info] Server running in ${message} environment`);
});

process.once('SIGUSR2', function () { process.kill(process.pid, 'SIGUSR2'); });
