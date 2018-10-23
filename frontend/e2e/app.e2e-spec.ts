import { ProjectBetrayalPage } from './app.po';

describe('project-betrayal App', () => {
  let page: ProjectBetrayalPage;

  beforeEach(() => {
    page = new ProjectBetrayalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
