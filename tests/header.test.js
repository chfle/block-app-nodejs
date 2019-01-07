const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

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

test('show logout button when signed in', async () => {
  await page.login();
  const logout = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

  expect(logout).toEqual('Logout');
});
