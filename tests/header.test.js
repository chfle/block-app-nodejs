const puppeteer = require('puppeteer');

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

// afterEach(async () => {
//   await browser.close();
// });

test('should show the app logo in the header', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('should show login button', async () => {
  const loginButton = await page.$eval('.right a', el => el.innerHTML);
  expect(loginButton).toEqual('Login With Google');
});

test('click login, should start oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test.only('show logout button when signed in', async () => {
  const id = '5c2b288bb27b581c767b0fad';

  const Buffer = require('safe-buffer').Buffer;
  const sessionObject = {
    passport: {
      user: id,
    },
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

  const Keygrip = require('keygrip');
  const keys = require('../config/keys');

  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign(`session=${sessionString}`);

  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');
});
