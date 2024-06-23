'use strict'
import * as constants from '@data/text-constants';
import * as links from '@data/links';
import { Languages } from '@data/languages';
import { Tabs } from '@data/web-tabs';
import { PageActions } from '@helpers/page-actions';
import { PageObjects } from '@page-objects/pageObjects';

describe('Google Translate | Text Translate Smoke Tests', () => {
    const pageActions: PageActions = new PageActions();
    const pageObjects = new PageObjects();

    beforeEach(async () => {
        await pageActions.openPage(links.BaseURL);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    it('Text-Translate-Smoke-01 - User should be able to translate text', async () => {
        await pageObjects.selectLanguagePage.selectFromToLanguages(Tabs.TEXT, Languages.ENGLISH, Languages.UKRAINIAN);
        await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await pageObjects.textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
    });

    it('Text-Translate-Smoke-02 - User should be able to use "Detect Language" option', async () => {
        await pageObjects.selectLanguagePage.selectFromToLanguages(Tabs.TEXT, Languages.DETECT_LANGUAGE, Languages.UKRAINIAN);
        await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await pageObjects.selectLanguagePage.checkSelectedLanguage(Tabs.TEXT, 'From', 'English - Detected')
        await pageObjects.textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
    });

    it('Text-Translate-Smoke-03 - User should be able to clear text by clicking on X button', async () => {
        await pageObjects.selectLanguagePage.searchAndSelectLanguage(Tabs.TEXT, 'From', Languages.ENGLISH);
        await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await pageObjects.textTranslatePage.clickClearSourceText(constants.engTranslateCheckText);
    });

    it('Text-Translate-Smoke-04 - User should be able to copy translated text', async () => {
        await pageObjects.selectLanguagePage.selectFromToLanguages(Tabs.TEXT, Languages.ENGLISH, Languages.UKRAINIAN);
        await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await pageObjects.textTranslatePage.clickCopyButton();
        await pageObjects.textTranslatePage.clickClearSourceText(constants.engTranslateCheckText);
        await pageObjects.textTranslatePage.insertCopiedText(constants.ukrTranslateCheckText);
        await pageObjects.textTranslatePage.checkTextCorrection('Translate from:', Languages.UKRAINIAN);
    });

    it('Text-Translate-Smoke-05 - User should be able to see character limit row', async () => {
        await pageObjects.textTranslatePage.checkCharactersLimit('0 of 5,000');
        await pageObjects.selectLanguagePage.searchAndSelectLanguage(Tabs.TEXT, 'From', Languages.ENGLISH);
        await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await pageObjects.textTranslatePage.checkCharactersLimit('58 of 5,000');
    });

    it('Text-Translate-Smoke-06 - User should be able to see Transcription row', async () => {
        // Check for Source field
        await pageObjects.selectLanguagePage.selectFromToLanguages(Tabs.TEXT, Languages.UKRAINIAN, Languages.ENGLISH);
        await pageObjects.textTranslatePage.insertSourceText(constants.ukrTranslateCheckText);
        await pageObjects.textTranslatePage.checkTranscriptionRowText(constants.ukrTextTranscription);

        // Check for Target field
        await pageObjects.textTranslatePage.clickClearSourceText(constants.ukrTranslateCheckText);
        await pageObjects.selectLanguagePage.clickSwapLanguages(Tabs.TEXT);
        await pageObjects.textTranslatePage.insertSourceText(constants.engTranslateCheckText);
        await pageObjects.textTranslatePage.checkTranslatedText(constants.ukrTranslateCheckText);
        await pageObjects.textTranslatePage.checkTranscriptionRowText(constants.ukrTextTranscription);
    });

    it('Text-Translate-Smoke-07 - User should be able to click on the "Show more/less" buttons for long Transcription', async () => {
        // Check for Source field
        await pageObjects.selectLanguagePage.selectFromToLanguages(Tabs.TEXT, Languages.UKRAINIAN, Languages.ENGLISH);
        await pageObjects.textTranslatePage.insertSourceText(constants.ukrLongText);
        await pageObjects.textTranslatePage.clickTranscriptionRowButton('Source', 'Show more');
        await pageObjects.textTranslatePage.clickTranscriptionRowButton('Source', 'Show less');

        // Check for Target field
        await pageObjects.selectLanguagePage.clickSwapLanguages(Tabs.TEXT);
        await pageObjects.textTranslatePage.clickTranscriptionRowButton('Target', 'Show more');
        await pageObjects.textTranslatePage.clickTranscriptionRowButton('Target', 'Show less');
    });
});
