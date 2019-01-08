const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

describe('When logged in', async () => {
  beforeEach((async () => {
    await page.login();
    await page.click('a.btn-floating');
  }));
  test('should show blog create form', async () => {
    const titleLabel = await page.getContentOf('.title label');

    expect(titleLabel).toEqual('Blog Title');
  });
});
