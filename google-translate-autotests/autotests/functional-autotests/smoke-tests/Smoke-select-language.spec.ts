'use strict'
import * as constants from '@data/constants';
import { PageActions } from '@helpers/page-actions';
import { PageObjects } from '@page-objects/pageObjects';

describe('Google Translate | Select Language Smoke Tests', () => {
    const pageObjects = new PageObjects();
    const pageActions: PageActions = new PageActions();
    const tabNames = ['Text', 'Document', 'Website', 'Image'];

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    tabNames.forEach((tab, index) => {
        it(`Select-Language-Smoke-${(index + 1).toString().padStart(2, '0')} - User should be able to select languages by click on header on the ${tab} tab`, async () => {
            await pageObjects.commonPage.clickGoogleTransalteTab(tab);
            await pageObjects.selectLanguagePage.clickLanguageTab(tab, 'From', 'English');
            await pageObjects.selectLanguagePage.clickLanguageTab(tab, 'To', 'Spanish');
        });
    });

    tabNames.forEach((tab, index) => {
        it(`Select-Language-Smoke-${(index + 4).toString().padStart(2, '0')} - User should be able to search and select languages on the ${tab} tab`, async () => {
            await pageObjects.commonPage.clickGoogleTransalteTab(tab);
            await pageObjects.selectLanguagePage.searchAndSelectLanguage(tab, 'From', 'English');
            await pageObjects.selectLanguagePage.searchAndSelectLanguage(tab, 'To', 'Spanish');
        });
    });

    tabNames.forEach((tab, index) => {
        it(`Select-Language-Smoke-${(index + 8).toString().padStart(2, '0')} - User should be able to use "Swap languages" button on the ${tab} tab`, async () => {
            await pageObjects.commonPage.clickGoogleTransalteTab(tab);
            await pageObjects.selectLanguagePage.selectFromToLanguages(tab, 'English', 'Spanish');
            await pageObjects.selectLanguagePage.clickSwapLanguages(tab);
            await pageObjects.selectLanguagePage.checkSelectedLanguage(tab, 'To', 'English');
            await pageObjects.selectLanguagePage.checkSelectedLanguage(tab, 'From', 'Spanish');
        });
    });
});
