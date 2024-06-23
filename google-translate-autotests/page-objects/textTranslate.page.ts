import allure from '@wdio/allure-reporter';
import { PageActions } from '../helpers/page-actions';
import websitesTranslatePage from '../page-objects/websitesTranslate.page';

class TextTranslatePage extends PageActions {
    //-----------------------------------------------------------
    // ELEMENTS
    //-----------------------------------------------------------

    private get insertSourceTextField() {
        return $('//textarea[@aria-label="Source text"]');
    }

    private getTransaltedText(text: string) {
        return $(`(//h3[text()='Translation result']/ancestor::div[1]//span[contains(., '${text}')])[1]`);
    }

    private getSourceText(correctText: string) {
        return $(`//h2[text()='Source text']/following-sibling::span//div[contains(., '${correctText}')]`);
    }

    private textCorrection(message: string, correctedWord: string) {
        return $(`//div[text()='${message}']/span/b/i[text()='${correctedWord}']`);
    }

    private incorrectLanguageCorrection(message: string, correctedLanguage: string) {
        return $(`//div[text()='${message}']/span[text()='${correctedLanguage}']`);
    }

    private textCorrectionButton(message: string) {
        return $(`//div[text()='${message}']/span`);
    }

    private get clearSourceText() {
        return $('button[aria-label="Clear source text"]');
    }

    private charactersLimit(numberOfUsed: string) {
        return $(`[aria-label="${numberOfUsed} characters used"]`);
    }

    private get copyTranslationButton() {
        return $('[aria-label="Copy translation"]');
    }

    private get textCopiedAlert() {
        return $('//div[text()="Translation copied"]');
    }

    private getTranscriptionRow(checkText: string) {
        return $(`//a[text()='Look up details']/ancestor::div[3]//span[text()='${checkText}']`);
    }

    private transcriptionRowButton(buttonName: string, number: string) {
        return $(`(//div[text()="${buttonName}"])[${number}]`);
    }

    private targetFieldLink(link: string) {
        return $(`//a/span[text()='${link}']`);
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async insertSourceText(text: string) {
        await allure.step(`When I insert source text "${text}"`, async () => {
            await this.waitClearSendKeys(this.insertSourceTextField, text);
        });
    }

    public async checkTranslatedText(text: string) {
        await allure.step(`When I check translated text "${text}"`, async () => {
            let arrayToCheck = text.split(' ');
            for (let i = 0; i < arrayToCheck.length; i++) {
                await this.waitElementVisible(this.getTransaltedText(arrayToCheck[i]));
            }
        });
    }

    public async checkTextCorrection(message: string, suggestedValiant: string) {
        await allure.step(`When I check text correction message "${message}: ${suggestedValiant}"`, async () => {
            message === 'Translate from:'
                ? await this.waitElementVisible(this.incorrectLanguageCorrection(message, suggestedValiant))
                : await this.waitElementVisible(this.textCorrection(message, suggestedValiant))
        });
    }

    public async clickTextCorrectionOption(message: string, correctText: string) {
        await allure.step(`When I click text correction option "${message}: ${correctText}"`, async () => {
            await this.waitClick(this.textCorrectionButton(message));
            await this.waitElementInvisible(this.textCorrectionButton(message));
            await this.waitElementPresent(this.getSourceText(correctText));
        });
    }

    public async clickClearSourceText(checkText: string) {
        await allure.step(`When I click clear source text ${checkText}"`, async () => {
            await this.waitClick(this.clearSourceText);
            await this.waitElementInvisible(this.getSourceText(checkText));
        });
    }

    public async checkCharactersLimit(numberOfUsed: string) {
        await allure.step(`When I check characters limit is ${numberOfUsed}"`, async () => {
            await this.waitElementVisible(this.charactersLimit(numberOfUsed));
        });
    }

    public async clickCopyButton() {
        await allure.step(`When I click copy button`, async () => {
            await this.waitClick(this.copyTranslationButton);
            await this.waitElementVisible(this.textCopiedAlert);
        });
    }

    public async insertCopiedText(checkPastedText: string) {
        await allure.step(`When I insert copied text`, async () => {
            await this.pasteTextFromClipboard(this.insertSourceTextField);
            await this.waitElementPresent(this.getSourceText(checkPastedText));
        });
    }

    public async checkTranscriptionRowText(checkText: string) {
        await allure.step(`When I check transcription row text "${checkText}"`, async () => {
            await this.waitElementPresent(this.getTranscriptionRow(checkText));
        });
    }

    public async clickTranscriptionRowButton(fieldName: string, buttonName: string) {
        await allure.step(`When I click transcription row button "${buttonName}"`, async () => {
            let number;
            switch (fieldName) {
                case 'Source':
                    number = 1;
                    break;
                case 'Target':
                    number = 2;
                    break;
            }
            await this.waitClick(this.transcriptionRowButton(buttonName, number));
            await this.waitElementInvisible(this.transcriptionRowButton(buttonName, number));
        });
    }

    public async checkTargetFieldLink(targetLink: string, transaltedLink: string) {
        await allure.step(`When I check target field link is "${targetLink}"`, async () => {
            await this.waitElementVisible(this.targetFieldLink(targetLink));
            await this.waitClick(this.targetFieldLink(targetLink));
            await websitesTranslatePage.openTranslatedWebsite(transaltedLink);
        });
    }
}

export default new TextTranslatePage();
