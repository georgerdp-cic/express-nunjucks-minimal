import { Router } from 'express';
import csurf from 'csurf';
const router = Router();

//const csrfP = csurf({ cookie: true });

router.get('/demo-form', function (req, res) {
    
    res.render('views/demoform', {
        pageTitle: 'demo-form',
        tabName: 'demoform'
    });

});

router.get('/accordion', function (req, res) {
    
    res.render('views/demoaccordion', {
        pageTitle: 'demo-accordion',
        tabName: 'demoaccordion'
    });

});

export default router;