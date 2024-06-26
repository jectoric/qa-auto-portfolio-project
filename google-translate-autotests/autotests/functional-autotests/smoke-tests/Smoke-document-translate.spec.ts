'use strict';
import * as constants from '@data/text-constants';
import * as links from '@data/links';
import { Languages } from '@data/languages';
import { Tabs } from '@data/web-tabs';
import { PageActions } from '@helpers/page-actions';
import { PageObjects } from '@page-objects/pageObjects';

describe('Google Translate | Document Translate Smoke Tests', () => {
    const pageObjects = new PageObjects();
    const pageActions: PageActions = new PageActions();
    const fileName = 'test_document.pdf';
    const fileSize = '16 KB';

    beforeEach(async () => {
        await pageActions.openPage(links.BaseURL);
        await pageObjects.commonPage.clickGoogleTransalteTab(Tabs.DOCUMENT);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Document-Transalate-Smoke-01 - User should be able to see name and size of uploaded file', async () => {
        await pageObjects.documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
    });

    it('Document-Transalate-Smoke-02 - User should be able to remove uploaded file', async () => {
        await pageObjects.documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
        await pageObjects.documentTranslatePage.waitForDocumentTabButton('Translate');
        await pageObjects.documentTranslatePage.removeFile(fileName, fileSize);
        await pageObjects.documentTranslatePage.checkTabText(['Choose a document']);
    });

    it('Document-Transalate-Smoke-03 - User should be able to tranlate uploaded file', async () => {
        await pageObjects.selectLanguagePage.selectFromToLanguages(Tabs.DOCUMENT, Languages.UKRAINIAN, Languages.ENGLISH);
        await pageObjects.documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
        await pageObjects.documentTranslatePage.clickDocumentTabButton('Translate');
        await pageObjects.documentTranslatePage.clickDocumentTabButton('Download translation');
        await pageObjects.documentTranslatePage.checkDownloadedFile(fileName, constants.fileTextCheck);
    });

    it('Document-Transalate-Smoke-04 - User should be able to remove translated file', async () => {
        await pageObjects.documentTranslatePage.uploadFileAndCheck(fileName, fileSize);
        await pageObjects.documentTranslatePage.clickDocumentTabButton('Translate');
        await pageObjects.documentTranslatePage.waitForDocumentTabButton('Download translation');
        await pageObjects.documentTranslatePage.removeFile(fileName, fileSize);
        await pageObjects.documentTranslatePage.checkTabText(['Choose a document']);
    });
});
