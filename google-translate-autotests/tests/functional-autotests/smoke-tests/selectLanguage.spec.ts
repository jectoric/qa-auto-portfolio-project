'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { CommonPage } from '../../../page-objects/common.page';
import { SelectLanguagePage } from '../../../page-objects/selectLanguage.page';

describe('Google Translate | Select Language Smoke Tests', () => {
    const commonPage: CommonPage = new CommonPage();
    const pageActions: PageActions = new PageActions();
    const selectLanguagePage: SelectLanguagePage = new SelectLanguagePage();
    const tabNames = ['Text', 'Document', 'Website', 'Image'];

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    tabNames.forEach((tab, index) => {
        it(`Select-Language-Smoke-${(index + 1).toString().padStart(2, '0')} - User should be able to select languages by click on header on the ${tab} tab`, async () => {
            await commonPage.clickGoogleTransalteTab(tab);
            await selectLanguagePage.clickLanguageTab(tab, 'From', 'English');
            await selectLanguagePage.clickLanguageTab(tab, 'To', 'Spanish');
        });
    });

    tabNames.forEach((tab, index) => {
        it(`Select-Language-Smoke-${(index + 4).toString().padStart(2, '0')} - User should be able to search and select languages on the ${tab} tab`, async () => {
            await commonPage.clickGoogleTransalteTab(tab);
            await selectLanguagePage.searchAndSelectLanguage(tab, 'From', 'English');
            await selectLanguagePage.searchAndSelectLanguage(tab, 'To', 'Spanish');
        });
    });

    tabNames.forEach((tab, index) => {
        it(`Select-Language-Smoke-${(index + 8).toString().padStart(2, '0')} - User should be able to use "Swap languages" button on the ${tab} tab`, async () => {
            await commonPage.clickGoogleTransalteTab(tab);
            await selectLanguagePage.selectFromToLanguages(tab, 'English', 'Spanish');
            await selectLanguagePage.clickSwapLanguages(tab);
            await selectLanguagePage.checkSelectedLanguage(tab, 'To', 'English');
            await selectLanguagePage.checkSelectedLanguage(tab, 'From', 'Spanish');
        });
    });
});
