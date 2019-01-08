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

  describe('and using valid inputs', async () => {
    beforeEach(async () => {
      await page.type('.title input', 'My Title');
      await page.type('.content input', 'My Content');
      await page.click('form button');
    });
    test('than should take user to review screen', async () => {
      const text = await page.getContentOf('h5');

      expect(text).toEqual('Please confirm your entries');
    });
    test('than should save new blog to the index page', async () => {
      await page.click('button.green');
      await page.waitFor('.card');

      const title = await page.getContentOf('.card-title');
      const content = await page.getContentOf('p');

      expect(title).toEqual('My Title');
      expect(content).toEqual('My Content');
    });
  });

  describe('And using invalid input', async () => {
    beforeEach(async () => {
      await page.click('form button');
    });
    test('form should show an error message', async () => {
      const titleError = await page.getContentOf('.title .red-text');
      const contentError = await page.getContentOf('.content .red-text');

      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});
