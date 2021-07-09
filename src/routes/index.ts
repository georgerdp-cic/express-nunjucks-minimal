import { Router } from 'express';
import csurf from 'csurf';
const router = Router();

const csrfP = csurf({ cookie: true });

router.get('/', csrfP, function (req: any, res: any) {

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

router.post('/submitdata', csrfP, (req: any, res: any) => {
    res.render('views/formdone', {
        name: req.body.username,
        surname: req.body.usersurname
    });
});

export default router;