import { EmpCRUDPage } from './app.po';

describe('emp-crud App', () => {
  let page: EmpCRUDPage;

  beforeEach(() => {
    page = new EmpCRUDPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
