
// Imports
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import nunjucks from 'nunjucks';
import path from 'path';
import helmet from 'helmet';
import indexRoute from './routes';
import demoform from './routes/demoform';
import { HttpException } from './utils/errorHandler';

// Interfaces
interface IPaths {
   templates: {
       dev: string;
       prod: string;
   }
}

// Constants
const isDev = process.env.NODE_ENV === 'development';

const paths: IPaths = {
    templates: {
        dev: path.join(__dirname, '../templates'),
        prod: path.join(__dirname, './templates')
    }
};

const app = express();

// Set helment
if (!isDev) {
    app.use(helmet());
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'Secrets should go in environment variables. I guess you know that already.',
    resave: true,
    cookie: { secure: false, httpOnly: true },
    saveUninitialized: false
}));

// Serve static files
app.use(express.static(path.join(__dirname + '/public')));

// Template engine configuration
nunjucks.configure(isDev ? paths.templates.dev : paths.templates.prod, {
    autoescape: true,
    express: app,
    watch: isDev
});

app.set("view engine", "njk");

// Routes
app.use('/', indexRoute);
app.use('/', demoform);

// Error handler CSRF
app.use((err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err?.code !== 'EBADCSRFTOKEN') return next(err);

    // handle CSRF token errors here
    res.status(403)
    res.send('Something is wrong.');
});

app.all('*', (req: express.Request, res: express.Response) => {
    res.status(404).json({ title: '(Something is wrong! Template with back button would be useful here.)' })
});

app.listen(8080, () => {
    const message = process.env.NODE_ENV === 'development' ? 'DEV' : 'production';
    console.log(`[Info] Server running in ${message} environment`);
});

process.once('SIGUSR2', () => { process.kill(process.pid, 'SIGUSR2'); });
