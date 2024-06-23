const fs = require('fs');
const path = require('path');
const assert = require('assert');

import allure from '@wdio/allure-reporter';
import commonPage from '@page-objects/common.page';
import { PageActions } from '@helpers/page-actions';

class DocumentTranslatePage extends PageActions {
    //-----------------------------------------------------------
    // ELEMENTS
    //-----------------------------------------------------------

    private tabText(checkText: string) {
        return $(`//div[contains(., "${checkText}")]`);
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
        return $('(//input[@name="file"])[1]');
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
        await allure.step(`When I check ${state} tab text is "${checkTextArray}"`, async () => {
            for (const text of checkTextArray) {
                state === 'Visible'
                    ? await this.waitElementVisible(this.tabText(text))
                    : await this.waitElementInvisible(this.tabText(text));
            }
        });
    }

    public async clickLearnMoreButton(checkLink: string) {
        await allure.step(`When I click on "Learn More" button and check link "${checkLink}"`, async () => {
            await this.waitClick(this.learnMoreButton);
            await commonPage.checkNextTabLink(checkLink);
        });
    }

    public async clickPoweredByButton(checkLink: string) {
        await allure.step(`When I click on "Powered By" button and check link "${checkLink}"`, async () => {
            await this.waitElementVisible(this.poweredByText);
            await this.waitClick(this.poweredByLink);
            await commonPage.checkNextTabLink(checkLink);
        });
    }

    public async uploadFile(fileName: string) {
        await allure.step(`When I upload file with name "${fileName}"`, async () => {
            const path = require('path');
            const filePath = path.join(__dirname, `../files/${fileName}`);
            await this.waitElementVisible(this.browseComputorLabel);
            await this.documentUploadInput.setValue(filePath);
        });
    }

    public async uploadFileAndCheck(fileName: string, fileSize: string) {
        await allure.step(`When I upload file with name "${fileName}" and check size is "${fileSize}"`, async () => {
            await this.uploadFile(fileName);
            await this.checkTabText([fileName, fileSize]);
        });
    }

    public async removeFile(fileName: string, fileSize: string) {
        await allure.step(`When I remove file with name "${fileName}" and size "${fileSize}"`, async () => {
            await this.waitClick(this.clearFileButton);
            await this.checkTabText([fileName, fileSize], 'Invisible');
        });
    }

    public async waitForDocumentTabButton(buttonName: string) {
        await allure.step(`When I wait for document tab button "${buttonName}"`, async () => {
            await this.waitElementVisible(this.translateButton(buttonName));
        });
    }

    public async clickDocumentTabButton(buttonName: string) {
        await allure.step(`When I click document tab button "${buttonName}"`, async () => {
            await this.waitForDocumentTabButton(buttonName);
            await this.waitClick(this.translateButton(buttonName));
        });
    }

    public async checkDownloadedFile(fileName: string, fileTextCheck: string) {
        await allure.step(`When I check downloaded file "${fileName}" contains text "${fileTextCheck}"`, async () => {
            const filePath = path.join(global.downloadDir, fileName);
            await this.waitForFileExists(filePath);
            const fileContents = fs.readFileSync(filePath);
            assert.ok(fileContents.includes(fileTextCheck), `The file contents do not includes "${fileTextCheck}`);
        });
    }

    public async checkInvalidFileAlert() {
        await allure.step(`When I check "Invalid File" alert`, async () => {
            await this.waitElementVisible(this.invalidFileAlertButton);
            await this.waitClick(this.invalidFileAlertButton);
        });
    }
}

export default new DocumentTranslatePage();
