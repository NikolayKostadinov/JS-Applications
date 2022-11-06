const {chromium} = require('playwright-chromium');
const {assert} = require('chai');

let browser, page; //Declare reusable variables

describe('E2E tests', async function() {
    this.timeout(5000);
    before(async () => { browser = await chromium.launch({headless:false, slowMo:1000}); });
    after(async () => { browser = await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads article titles', async ()=>{
        await page.goto('http://localhost:3000');
        // await page.click('text=More');
        // await page.screenshot({path:'site.png'});
        const  content = await page.textContent('#main');
        assert.include(content,
            'Scalable Vector Graphics',
            'Open standard',
            'Unix',
            'ALGOL');
    });

    it('Button more works', async ()=>{
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        await page.waitForSelector('.accordion');
        const  content = await page.textContent('div.extra >> p');
        assert.include(content,
            'Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.');

        const  btnText = await page.textContent('button');
        assert.equal(btnText, 'Less');
    });

    it('Button lessWorks', async ()=>{
        await page.goto('http://localhost:3000');
        await page.click('text=More');
        await page.waitForSelector('.accordion');
        await page.click('text=Less');

        const exists = await page.isVisible('div.extra >> p');

        assert.isFalse(exists);
        const  btnText = await page.textContent('button');
        assert.equal(btnText, 'More');
    });
});
