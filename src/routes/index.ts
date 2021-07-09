import { Router } from 'express';
import csurf from 'csurf';
const router = Router();

const csrfP = csurf({ cookie: true });

router.get('/', csrfP, function (req: any, res: any) {
    
    res.render('views/index', {
        pageTitle: 'title',
        headerBodyText: 'Welcome to v0.01',
        email: 'george.crisan-cic@ibm.com',
        cToken: req.csrfToken(),
        featList: [
            {
                name: 'Browser-sync',
                desc: 'Live reload on change (templates and scss)'
            }, {
                name: 'Nodemon',
                desc: 'Server reload'
            },

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