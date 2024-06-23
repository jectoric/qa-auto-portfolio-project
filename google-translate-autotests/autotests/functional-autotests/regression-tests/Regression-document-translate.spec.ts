'use strict';
import * as links from '@data/links';
import { Tabs } from '@data/web-tabs';
import { PageActions } from '@helpers/page-actions';
import { PageObjects } from '@page-objects/pageObjects';

describe('Google Translate | Document Translate Regression Tests', () => {
    const pageActions: PageActions = new PageActions();
    const pageObjects = new PageObjects();

    beforeAll(async () => {
        await pageActions.openPage(links.BaseURL);
        await pageObjects.commonPage.clickGoogleTransalteTab(Tabs.DOCUMENT);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Document-Transalate-Regression-01 - User should not be able to load not permitted file', async () => {
        await pageObjects.documentTranslatePage.uploadFile('test_image.jpg');
        await pageObjects.documentTranslatePage.checkInvalidFileAlert();
    });

    it('Document-Transalate-Regression-02 - User should be able to see tab captions and click "Learn more" button', async () => {
        await pageObjects.documentTranslatePage.checkTabText(['Or choose a file', 'Supported file types: .docx, .pdf, .pptx, .xlsx.']);
        await pageObjects.documentTranslatePage.clickLearnMoreButton('https://support.google.com/translate/answer/');
    });

    it('Document-Transalate-Regression-03 - User should be able to check "Powered by" link', async () => {
        await pageObjects.documentTranslatePage.clickPoweredByButton('https://cloud.google.com/translation-hub');
    });
});
