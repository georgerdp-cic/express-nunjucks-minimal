import { Router } from 'express';
import csurf from 'csurf';
const router = Router();

const csrfP = csurf({ cookie: true });

router.get('/', csrfP, (req, res) => {

    res.render('views/index', {
        pageTitle: 'Welcome',
        headerBodyText: 'Welcome to v1.0.1',
        email: 'george.crisan-cic@ibm.com',
        // cToken: req.csrfToken(),
        tabName: 'home',
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

export default router;