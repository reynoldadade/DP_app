import { AppPage } from './app.po';
import { element, by, Key, browser } from 'protractor';

describe('new App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });
    describe('default screen', () => {
        beforeEach(() => {
            page.navigateTo('/');
        });
        it('should log into app', () => {
            page.getUserName().sendKeys('56-0001-00005');
            page.getPassword().sendKeys('1111');
            page.getButton().click();
        });
    });
});
