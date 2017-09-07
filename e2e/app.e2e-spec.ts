import { DataViszPage } from './app.po';

describe('data-visz App', function() {
  let page: DataViszPage;

  beforeEach(() => {
    page = new DataViszPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
