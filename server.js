"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let nunjucks = require('nunjucks');
const path = require('path');
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
nunjucks.configure(path.resolve(__dirname, 'templates'), {
    autoescape: true,
    express: app,
    watch: process.env.NODE_ENV === 'development'
});
app.set("view engine", "njk");
app.get('/', function (req, res) {
    res.render(path.join('index'), {
        pageTitle: 'Welcome test page',
        headerBodyText: 'This is header body text',
        email: 'georgerdp@gmail.com',
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
app.post('/submitdata', (req, res) => {
    res.render(path.join(__dirname, '/templates/views/formdone'), {
        name: req.body.username,
        surname: req.body.usersurname
    });
});
app.all('*', (req, res) => {
    res.json({ title: 'We are having an issue ... you should not be here.' });
});
app.listen(3000, () => {
    console.log('Server is up.');
});
