'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { takeScreenShot } from '../../../helpers/artifacts';
import { CommonPage } from '../../../page-objects/common.page';
import { DocumentTranslatePage } from '../../../page-objects/documentTranslate.page';

describe('Google Translate | Document Translate Regression Tests', () => {
    const commonPage: CommonPage = new CommonPage();
    const pageActions: PageActions = new PageActions();
    const documentTranslatePage: DocumentTranslatePage = new DocumentTranslatePage();

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
        await commonPage.clickGoogleTransalteTab('Document');
    });

    afterEach(async () => {
        await takeScreenShot();
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Document-Transalate-Regression-01 - User should not be able to load not permitted file', async () => {
        await documentTranslatePage.uploadFile('test_image.jpg');
        await documentTranslatePage.checkInvalidFileAlert();
    });

    it('Document-Transalate-Regression-02 - User should be able to see tab captions and click "Learn more" button', async () => {
        await documentTranslatePage.checkTabText(['Or choose a file', 'Supported file types: .docx, .pdf, .pptx, .xlsx.']);
        await documentTranslatePage.clickLearnMoreButton('https://support.google.com/translate/answer/');
    });

    it('Document-Transalate-Regression-03 - User should be able to check "Powered by" link', async () => {
        await documentTranslatePage.clickPoweredByButton('https://cloud.google.com/translation-hub');
    });
});