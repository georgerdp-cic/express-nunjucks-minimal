import { Router } from 'express';
import csurf from 'csurf';
const router = Router();

const csrfP = csurf({ cookie: true });

router.get('/', csrfP, function (req, res) {
    
    res.render('views/index', {
        pageTitle: 'title',
        headerBodyText: 'Welcome to v0.0.1',
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

router.post('/submitdata', csrfP, (req, res) => {
    res.render('views/formdone', {
        name: req.body.username,
        surname: req.body.usersurname
    });
});

export default router;