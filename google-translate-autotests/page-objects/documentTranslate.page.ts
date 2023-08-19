const fs = require('fs');
const path = require('path');
const assert = require('assert');
import { CommonPage } from './common.page';
import { PageActions } from '../helpers/page-actions';
const commonPage: CommonPage = new CommonPage();

export class DocumentTranslatePage extends PageActions {
    //-----------------------------------------------------------
    // ELEMENTS
    //-----------------------------------------------------------

    private tabText(checkText: string) {
        return $(`//div[text()="${checkText}"]`);
    }

    private get learnMoreButton() {
        return $('[aria-label="Learn more about document translation"]');
    }

    private get poweredByText() {
        return $('//*[@alt="Google Cloud logo"]/following-sibling::span[text()="Powered by "]');
    }

    private get poweredByLink() {
        return $('//*[@alt="Google Cloud logo"]/following-sibling::span//a');
    }

    private get clearFileButton() {
        return $('[aria-label="Clear file"]');
    }

    private get documentUploadInput() {
        return $('input[name="file"]');
    }

    private translateButton(buttonText: string) {
        return $(`//span[text()="${buttonText}"]/ancestor::button`);
    }

    private get browseComputorLabel() {
        return $('//label[text()="Browse your files"]');
    }

    private get invalidFileAlertButton() {
        return $(`//div[text()="Can't translate this file format"]/ancestor::div[1]//button/span[contains(., "Got it")]`);
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async checkTabText(checkTextArray: string[], state: string = 'Visible') {
        for (const text of checkTextArray) {
            state === 'Visible'
                ? await this.waitElementVisible(this.tabText(text))
                : await this.waitElementInvisible(this.tabText(text))
        }
    }

    public async clickLearnMoreButton(checkLink: string) {
        await this.waitClick(this.learnMoreButton);
        await commonPage.checkNextTabLink(checkLink);
    }

    public async clickPoweredByButton(checkLink: string) {
        await this.waitElementVisible(this.poweredByText);
        await this.waitClick(this.poweredByLink);
        await commonPage.checkNextTabLink(checkLink);
    }

    public async uploadFile(fileName: string) {
        const path = require('path');
        const filePath = path.join(__dirname, `../data/${fileName}`);
        await this.waitElementVisible(this.browseComputorLabel);
        await this.documentUploadInput.setValue(filePath);
    }

    public async uploadFileAndCheck(fileName: string, fileSize: string) {
        await this.uploadFile(fileName);
        await this.checkTabText([fileName, fileSize]);
    }

    public async removeFile(fileName: string, fileSize: string) {
        await this.waitClick(this.clearFileButton);
        await this.checkTabText([fileName, fileSize], 'Invisible');
    }

    public async waitForDocumentTabButton(buttonName: string) {
        await this.waitElementVisible(this.translateButton(buttonName));
    }

    public async clickDocumentTabButton(buttonName: string) {
        await this.waitForDocumentTabButton(buttonName);
        await this.waitClick(this.translateButton(buttonName));
    }

    public async checkDownloadedFile(fileName: string, fileTextCheck: string) {
        const filePath = path.join(global.downloadDir, fileName);
        await this.waitForFileExists(filePath);
        const fileContents = fs.readFileSync(filePath);
        assert.ok(fileContents.includes(fileTextCheck), `The file contents do not includes "${fileTextCheck}`);
    }

    public async checkInvalidFileAlert() {
        await this.waitElementVisible(this.invalidFileAlertButton);
        await this.waitClick(this.invalidFileAlertButton);
    }
}
