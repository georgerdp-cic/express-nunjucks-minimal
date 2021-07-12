import { Router } from 'express';
import csurf from 'csurf';
const router = Router();

const csrfP = csurf({ cookie: true });

router.get('/demo-form', function (req, res) {
    
    res.render('views/demoform', {
        //cToken: req.csrfToken(),
        pageTitle: 'demo-form',
        tabName: 'demoform'
    });

});

export default router;