'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { TextTranslatePage } from '../../../page-objects/textTranslate.page';
import { SelectLanguagePage } from '../../../page-objects/selectLanguage.page';

describe('Google Translate | Text Translate Regression Tests', () => {
    const pageActions: PageActions = new PageActions();
    const textTranslatePage: TextTranslatePage = new TextTranslatePage();
    const selectLanguagePage: SelectLanguagePage = new SelectLanguagePage();
    const tabName = 'Text';

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
    });

    beforeEach(async () => {
        await selectLanguagePage.selectFromToLanguages(tabName, 'English', 'Ukrainian');
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Text-Transalate-Regression-01 - User should not be able select same languages in Source/Traget fields', async () => {
        await selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Ukrainian');
        await selectLanguagePage.checkSelectedLanguage(tabName, 'To', 'English');
    });

    it('Text-Transalate-Regression-02 - User should be able to use redirect button after inserting link', async () => {
        await textTranslatePage.insertSourceText(constants.LinkedinURL);
        await textTranslatePage.checkTargetFieldLink(constants.LinkedinURL, constants.LinkedinTransaltedURL);
    });

    describe('Google Translate | Text Translate Regression | Text Translate Autocorrect Tests', () => {
        it('Text-Autocorrect-Regression-03 - User should see "Did you mean" autocorrection option for text with a typo', async () => {
            await selectLanguagePage.clickSwapLanguages(tabName);
            await textTranslatePage.insertSourceText('Привт! Як справи?');
            await textTranslatePage.checkTextCorrection('Showing translation for', 'Привіт');
            await textTranslatePage.clickTextCorrectionOption('Showing translation for', 'Привіт! Як справи?');
            await textTranslatePage.checkTranslatedText('Hello! How are you?');
        });
    
        it('Text-Autocorrect-Regression-04 - User should see "Showing translation for" autocorrection option for text with a typo', async () => {
            await textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await textTranslatePage.checkTextCorrection('Showing translation for', 'Hello');
            await textTranslatePage.clickTextCorrectionOption('Showing translation for', constants.engTranslateCheckText);
            await textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
        });
    
        it('Text-Autocorrect-Regression-05 - User should see "Translate instead" autocorrection option for text with a typo', async () => {
            await textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await textTranslatePage.clickTextCorrectionOption('Translate instead', constants.engTypoTextCheck);
            await textTranslatePage.checkTextCorrection('Did you mean:', 'Hello');
            await textTranslatePage.clickTextCorrectionOption('Did you mean:', constants.engTranslateCheckText);
            await textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
        });
    
        it('Text-Autocorrect-Regression-06 - User should see "Translate from" tooltip after after entering text', async () => {
            await selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Lingala');
            await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
            await textTranslatePage.checkTextCorrection('Translate from:', 'English');
            await textTranslatePage.clickTextCorrectionOption('Translate from:', constants.engTranslateCheckText);
        });
    
        it('Text-Autocorrect-Regression-07 - User should see "Translate from" and "Showing translation for" tooltips after after entering text', async () => {
            // Check "Showing translation for" option
            await selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Lingala');
            await textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await textTranslatePage.checkTextCorrection('Showing translation for', 'Hello');
            await textTranslatePage.clickTextCorrectionOption('Showing translation for', constants.engTranslateCheckText);
    
            // Check "Translate from" tooltip
            await textTranslatePage.checkTextCorrection('Translate from:', 'English');
            await textTranslatePage.clickTextCorrectionOption('Translate from:', constants.engTranslateCheckText);
        });
    
        it('Text-Autocorrect-Regression-08 - User should see "Translate instead" and "Showing translation for" tooltips after after entering text', async () => {
            // Check "Translate instead" option
            await selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'Lingala');
            await textTranslatePage.insertSourceText(constants.engTypoTextCheck);
            await textTranslatePage.clickTextCorrectionOption('Translate instead', constants.engTypoTextCheck);
            await textTranslatePage.checkTextCorrection('Did you mean:', 'Hello');
            await textTranslatePage.clickTextCorrectionOption('Did you mean:', constants.engTranslateCheckText);
    
            // Check "Translate from" tooltip
            await textTranslatePage.checkTextCorrection('Translate from:', 'English');
            await textTranslatePage.clickTextCorrectionOption('Translate from:', constants.engTranslateCheckText);
        });
    });
});
