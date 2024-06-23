'use strict'
import * as constants from '../../../data/constants';
import { PageActions } from '../../../helpers/page-actions';
import { takeScreenShot } from '../../../helpers/artifacts';
import { PageObjects } from '@page-objects/pageObjects';

describe('Google Translate | Text Translate Regression Tests', () => {
    const pageActions: PageActions = new PageActions();
    const pageObjects = new PageObjects();
    const tabName = 'Text';

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
    });

    beforeEach(async () => {
        await pageObjects.selectLanguagePage.selectFromToLanguages(tabName, 'English', 'Ukrainian');
    });

    afterEach(async () => {
        await takeScreenShot();
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    describe('Google Translate | Text Translate Regression | Text Translate Autocorrect Tests', () => {
        it('Text-Autocorrect-Regression-01 - User should see "Did you mean" autocorrection option for text with a typo', async () => {
            await pageObjects.selectLanguagePage.clickSwapLanguages(tabName);
            await pageObjects.textTranslatePage.insertSourceText('Привт! Як справи?');
            await pageObjects.textTranslatePage.checkTextCorrection('Showing translation for', 'Привіт');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Showing translation for', 'Привіт! Як справи?');
            await pageObjects.textTranslatePage.checkTranslatedText('Hello! How are you?');
        });

        it('Text-Autocorrect-Regression-02 - User should see "Showing translation for" autocorrection option for text with a typo', async () => {
            await pageObjects.textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await pageObjects.textTranslatePage.checkTextCorrection('Showing translation for', 'Hello');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Showing translation for', constants.engTranslateCheckText);
            await pageObjects.textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
        });

        it('Text-Autocorrect-Regression-03 - User should see "Translate instead" autocorrection option for text with a typo', async () => {
            await pageObjects.textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Translate instead', constants.engTypoTextCheck);
            await pageObjects.textTranslatePage.checkTextCorrection('Did you mean:', 'Hello');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Did you mean:', constants.engTranslateCheckText);
            await pageObjects.textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
        });

        it('Text-Autocorrect-Regression-04 - User should see "Translate from" tooltip after after entering text', async () => {
            await pageObjects.selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Lingala');
            await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
            await pageObjects.textTranslatePage.checkTextCorrection('Translate from:', 'English');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Translate from:', constants.engTranslateCheckText);
        });

        it('Text-Autocorrect-Regression-05 - User should see "Translate from" and "Showing translation for" tooltips after after entering text', async () => {
            // Check "Showing translation for" option
            await pageObjects.selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Lingala');
            await pageObjects.textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await pageObjects.textTranslatePage.checkTextCorrection('Showing translation for', 'Hello');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Showing translation for', constants.engTranslateCheckText);

            // Check "Translate from" tooltip
            await pageObjects.textTranslatePage.checkTextCorrection('Translate from:', 'English');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Translate from:', constants.engTranslateCheckText);
        });

        it('Text-Autocorrect-Regression-06 - User should see "Translate instead" and "Showing translation for" tooltips after after entering text', async () => {
            // Check "Translate instead" option
            await pageObjects.selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Lingala');
            await pageObjects.textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Translate instead', constants.engTypoTextCheck);
            await pageObjects.textTranslatePage.checkTextCorrection('Did you mean:', 'Hello');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Did you mean:', constants.engTranslateCheckText);

            // Check "Translate from" tooltip
            await pageObjects.textTranslatePage.checkTextCorrection('Translate from:', 'English');
            await pageObjects.textTranslatePage.clickTextCorrectionOption('Translate from:', constants.engTranslateCheckText);
        });
    });

    it('Text-Transalate-Regression-07 - User should not be able select same languages in Source/Target fields', async () => {
        await pageObjects.selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Ukrainian');
        await pageObjects.selectLanguagePage.checkSelectedLanguage(tabName, 'To', 'English');
    });

    it('Text-Transalate-Regression-08 - User should be able to use redirect button after inserting link', async () => {
        await pageObjects.textTranslatePage.insertSourceText(constants.LinkedinURL);
        await pageObjects.textTranslatePage.checkTargetFieldLink(constants.LinkedinURL, constants.LinkedinTransaltedURL);
    });
});
