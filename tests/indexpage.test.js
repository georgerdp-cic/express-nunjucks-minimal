
import {JSDOM} from 'jsdom';
import nunjucks from 'nunjucks';

const render = nunjucks.render;
const dom = new JSDOM(render(''))

describe('Initial test',() => {
    const a = 'a';
    const b = 'a';

    test('Expect a to be a', () => {

        expect(a).toEqual(a);

    });

});