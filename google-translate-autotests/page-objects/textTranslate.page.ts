import { PageActions } from '../helpers/page-actions';
import { WebsitesTranslatePage } from '../page-objects/websitesTranslate.page';
const websitesTranslatePage: WebsitesTranslatePage = new WebsitesTranslatePage();

export class TextTranslatePage extends PageActions {
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
        await this.waitClearSendKeys(this.insertSourceTextField, text);
    }

    public async checkTranslatedText(text: string) {
        let arrayToCheck = text.split(' ');
        for (let i = 0; i < arrayToCheck.length; i++) {
            await this.waitElementVisible(this.getTransaltedText(arrayToCheck[i]));
        }
    }

    public async checkTextCorrection(message: string, suggestedValiant: string) {
        message === 'Translate from:'
            ? await this.waitElementVisible(this.incorrectLanguageCorrection(message, suggestedValiant))
            : await this.waitElementVisible(this.textCorrection(message, suggestedValiant))
    }

    public async clickTextCorrectionOption(message: string, correctText: string) {
        await this.waitClick(this.textCorrectionButton(message));
        await this.waitElementInvisible(this.textCorrectionButton(message));
        await this.waitElementPresent(this.getSourceText(correctText));
    }

    public async clickClearSourceText(checkText: string) {
        await this.waitClick(this.clearSourceText);
        await this.waitElementInvisible(this.getSourceText(checkText));
    }

    public async checkCharactersLimit(numberOfUsed: string) {
        await this.waitElementVisible(this.charactersLimit(numberOfUsed));
    }

    public async clickCopyButton() {
        await this.waitClick(this.copyTranslationButton);
        await this.waitElementVisible(this.textCopiedAlert);
    }

    public async insertCopiedText(checkPastedText: string) {
        await this.pasteTextFromClipboard(this.insertSourceTextField);
        await this.waitElementPresent(this.getSourceText(checkPastedText));
    }

    public async checkTranscriptionRowText(checkText: string) {
        await this.waitElementPresent(this.getTranscriptionRow(checkText));
    }

    public async clickTranscriptionRowButton(fieldName: string, buttonName: string) {
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
    }

    public async checkTargetFieldLink(targetLink: string, transaltedLink: string) {
        await this.waitElementVisible(this.targetFieldLink(targetLink));
        await this.waitClick(this.targetFieldLink(targetLink));
        await websitesTranslatePage.openTranslatedWebsite(transaltedLink);
    }
}
