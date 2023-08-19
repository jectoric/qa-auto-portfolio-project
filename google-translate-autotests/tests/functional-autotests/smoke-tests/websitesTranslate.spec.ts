'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { CommonPage } from '../../../page-objects/common.page';
import { SelectLanguagePage } from '../../../page-objects/selectLanguage.page';
import { WebsitesTranslatePage } from '../../../page-objects/websitesTranslate.page';

describe('Google Translate | Websites Translate Smoke Tests', () => {
    const commonPage: CommonPage = new CommonPage();
    const pageActions: PageActions = new PageActions();
    const selectLanguagePage: SelectLanguagePage = new SelectLanguagePage();
    const websitesTranslatePage: WebsitesTranslatePage = new WebsitesTranslatePage();
    const tabName = 'Website';

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
        await commonPage.clickGoogleTransalteTab(tabName);
        await selectLanguagePage.selectFromToLanguages(tabName, 'English', 'Ukrainian');
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Websites-Translate-Smoke-01 - User should be able to translate page', async () => {
        await websitesTranslatePage.fillWebsiteInputField(constants.LinkedinURL);
        await websitesTranslatePage.checkTranslatedWebsite(constants.LinkedinTransaltedURL);
    });

    describe('Google Translate | Websites Translate Smoke Tests | Negative Tests', () => {
        it('Websites-Translate-Smoke-02 - User should be able to see aleart if link is incorrect', async () => {
            await websitesTranslatePage.fillWebsiteInputField('https');
            await websitesTranslatePage.clickTranslateWebsiteButton();
            await websitesTranslatePage.checkAlert('Enter a valid URL');
        });

        it('Websites-Translate-Smoke-03 - User should be able to use clear field button', async () => {
            await websitesTranslatePage.fillWebsiteInputField('https');
            await websitesTranslatePage.clickClearLinkField();
        });

        it('Websites-Translate-Smoke-04 - User should be able to see aleart when filed is empty', async () => {
            await websitesTranslatePage.clickTranslateWebsiteButton();
            await websitesTranslatePage.checkAlert('Enter a URL');
        });
    });
});