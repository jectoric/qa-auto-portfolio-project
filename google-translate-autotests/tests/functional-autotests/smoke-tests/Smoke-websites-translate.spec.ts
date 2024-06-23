'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { PageObjects } from '../../../page-objects/pageObjects';

describe('Google Translate | Websites Translate Smoke Tests', () => {
    const pageObjects = new PageObjects();
    const pageActions: PageActions = new PageActions();
    const tabName = 'Website';

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
        await pageObjects.commonPage.clickGoogleTransalteTab(tabName);
        await pageObjects.selectLanguagePage.selectFromToLanguages(tabName, 'English', 'Ukrainian');
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Websites-Translate-Smoke-01 - User should be able to translate page', async () => {
        await pageObjects.websitesTranslatePage.fillWebsiteInputField(constants.LinkedinURL);
        await pageObjects.websitesTranslatePage.checkTranslatedWebsite(constants.LinkedinTransaltedURL);
    });

    describe('Google Translate | Websites Translate Smoke Tests | Negative Tests', () => {
        it('Websites-Translate-Smoke-02 - User should be able to see aleart if link is incorrect', async () => {
            await pageObjects.websitesTranslatePage.fillWebsiteInputField('https');
            await pageObjects.websitesTranslatePage.clickTranslateWebsiteButton();
            await pageObjects.websitesTranslatePage.checkAlert('Enter a valid URL');
        });

        it('Websites-Translate-Smoke-03 - User should be able to use clear field button', async () => {
            await pageObjects.websitesTranslatePage.fillWebsiteInputField('https');
            await pageObjects.websitesTranslatePage.clickClearLinkField();
        });

        it('Websites-Translate-Smoke-04 - User should be able to see aleart when filed is empty', async () => {
            await pageObjects.websitesTranslatePage.clickTranslateWebsiteButton();
            await pageObjects.websitesTranslatePage.checkAlert('Enter a URL');
        });
    });
});