'use strict'
import * as constants from '../../../helpers/constants';
import { PageActions } from '../../../helpers/page-actions';
import { TextTranslatePage } from '../../../page-objects/textTranslate.page';
import { SelectLanguagePage } from '../../../page-objects/selectLanguage.page';

describe('Google Translate | Text Translate Smoke Tests', () => {
    const pageActions: PageActions = new PageActions();
    const textTranslatePage: TextTranslatePage = new TextTranslatePage();
    const selectLanguagePage: SelectLanguagePage = new SelectLanguagePage();
    const tabName = 'Text';

    beforeEach(async () => {
        await pageActions.openPage(constants.BaseURL);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Text-Translate-Smoke-01 - User should be able to translate text', async () => {
        await selectLanguagePage.selectFromToLanguages(tabName, 'English', 'Ukrainian');
        await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
    });

    it('Text-Translate-Smoke-02 - User should be able to use "Detect Language" option', async () => {
        await selectLanguagePage.selectFromToLanguages(tabName, 'Detect language', 'Ukrainian');
        await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await selectLanguagePage.checkSelectedLanguage(tabName, 'From', 'English - Detected')
        await textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
    });

    it('Text-Translate-Smoke-03 - User should be able to clear text by clicking on X button', async () => {
        await selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'English');
        await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await textTranslatePage.clickClearSourceText(constants.engTranslateCheckText);
    });

    it('Text-Translate-Smoke-04 - User should be able to copy translated text', async () => {
        await selectLanguagePage.selectFromToLanguages(tabName, 'English', 'Ukrainian');
        await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await textTranslatePage.clickCopyButton();
        await textTranslatePage.clickClearSourceText(constants.engTranslateCheckText);
        await textTranslatePage.insertCopiedText(constants.ukrTranslateCheckText);
        await textTranslatePage.checkTextCorrection('Translate from:', 'Ukrainian');
    });

    it('Text-Translate-Smoke-05 - User should be able to see character limit row', async () => {
        await textTranslatePage.checkCharactersLimit('0 of 5,000');
        await selectLanguagePage.searchAndSelectLanguage(tabName, 'From', 'English');
        await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await textTranslatePage.checkCharactersLimit('58 of 5,000');
    });

    it('Text-Translate-Smoke-06 - User should be able to see Transcription row', async () => {
        // Check for Source field
        await selectLanguagePage.selectFromToLanguages(tabName, 'Ukrainian', 'English');
        await textTranslatePage.insertSourceText(constants.ukrTranslateCheckText);
        await textTranslatePage.checkTranscriptionRowText(constants.ukrTextTranscription);

        // Check for Traget field
        await textTranslatePage.clickClearSourceText(constants.ukrTranslateCheckText);
        await selectLanguagePage.clickSwapLanguages(tabName);
        await textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
        await textTranslatePage.checkTranscriptionRowText(constants.ukrTextTranscription);
    });

    it('Text-Translate-Smoke-07 - User should be able to click on the "Show more/less" buttons for long Transcription', async () => {
        // Check for Source field
        await selectLanguagePage.selectFromToLanguages(tabName, 'Ukrainian', 'English');
        await textTranslatePage.insertSourceText(constants.ukrLongText);
        await textTranslatePage.clickTranscriptionRowButton('Source', 'Show more');
        await textTranslatePage.clickTranscriptionRowButton('Source', 'Show less');

        // Check for Traget field
        await selectLanguagePage.clickSwapLanguages(tabName);
        await textTranslatePage.clickTranscriptionRowButton('Traget', 'Show more');
        await textTranslatePage.clickTranscriptionRowButton('Traget', 'Show less');
    });
});
