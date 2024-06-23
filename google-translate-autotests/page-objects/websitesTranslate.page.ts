import allure from '@wdio/allure-reporter';
import { PageActions } from '@helpers/page-actions';

class WebsitesTranslatePage extends PageActions {
    //-----------------------------------------------------------
    // ELEMENTS
    //-----------------------------------------------------------

    private get websiteInputField() {
        return $('input[type="url"]');
    }

    private get translateWebsiteButton() {
        return $('button[aria-label="Translate website"]');
    }

    private getAlertText(alertText: string) {
        return $(`//p[@role="alert"][text()='${alertText}']`);
    }

    private get clearWebsiteFieldButton() {
        return $('[aria-label="Clear website URL"]');
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async fillWebsiteInputField(websiteLink: string) {
        await allure.step(`When I fill Website Input Field with "${websiteLink}" value`, async () => {
            await this.waitClick(this.websiteInputField);
            await this.waitSendKeys(this.websiteInputField, websiteLink);
        });
    }

    public async clickTranslateWebsiteButton() {
        await allure.step(`When I click on the translate website button`, async () => {
            await this.waitClick(this.translateWebsiteButton);
        });
    }

    public async checkTranslatedWebsite(checkLink: string) {
        await allure.step(`When I check translated website "${checkLink}"`, async () => {
            await this.clickTranslateWebsiteButton();
            await this.openTranslatedWebsite(checkLink);
        });
    }

    public async openTranslatedWebsite(checkLink: string) {
        await allure.step(`When I open translated website "${checkLink}"`, async () => {
            await browser.pause(3000);
            await this.switchToNextTab();
            await this.checkOpenedPage(checkLink);
            await this.closeTab();
        });
    }

    public async checkAlert(alertText: string) {
        await allure.step(`When I check alert "${alertText}" is visible`, async () => {
            await this.waitElementVisible(this.getAlertText(alertText));
        });
    }

    public async clickClearLinkField() {
        await allure.step(`When I click clear link field`, async () => {
            await this.waitClick(this.clearWebsiteFieldButton);
        });
    }
}

export default new WebsitesTranslatePage();
