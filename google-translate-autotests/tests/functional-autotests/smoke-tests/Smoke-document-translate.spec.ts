'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { CommonPage } from '../../../page-objects/common.page';
import { SelectLanguagePage } from '../../../page-objects/selectLanguage.page';
import { DocumentTranslatePage } from '../../../page-objects/documentTranslate.page';

describe('Google Translate | Document Translate Smoke Tests', () => {
    const commonPage: CommonPage = new CommonPage();
    const pageActions: PageActions = new PageActions();
    const selectLanguagePage: SelectLanguagePage = new SelectLanguagePage();
    const documentTranslatePage: DocumentTranslatePage = new DocumentTranslatePage();
    const tabName = 'Document';
    const fileName = 'test_document.pdf';
    const fileSize = '16 KB';

    beforeEach(async () => {
        await pageActions.openPage(constants.BaseURL);
        await commonPage.clickGoogleTransalteTab(tabName);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Document-Transalate-Smoke-01 - User should be able to see name and size of uploaded file', async () => {
        await documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
    });

    it('Document-Transalate-Smoke-02 - User should be able to remove uploaded file', async () => {
        await documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
        await documentTranslatePage.waitForDocumentTabButton('Translate');
        await documentTranslatePage.removeFile(fileName, fileSize);
        await documentTranslatePage.checkTabText(['Choose a document']);
    });

    it('Document-Transalate-Smoke-03 - User should be able to tranlate uploaded file', async () => {
        await selectLanguagePage.selectFromToLanguages(tabName, 'Ukrainian', 'English');
        await documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
        await documentTranslatePage.clickDocumentTabButton('Translate');
        await documentTranslatePage.clickDocumentTabButton('Download translation');
        await documentTranslatePage.checkDownloadedFile(fileName, constants.fileTextCheck);
    });

    it('Document-Transalate-Smoke-04 - User should be able to remove translated file', async () => {
        await documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
        await documentTranslatePage.clickDocumentTabButton('Translate');
        await documentTranslatePage.waitForDocumentTabButton('Download translation');
        await documentTranslatePage.removeFile(fileName, fileSize);
        await documentTranslatePage.checkTabText(['Choose a document']);
    });
});
