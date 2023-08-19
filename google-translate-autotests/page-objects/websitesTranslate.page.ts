import { PageActions } from '../helpers/page-actions';

export class WebsitesTranslatePage extends PageActions {
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
        await this.waitClick(this.websiteInputField);
        await this.waitSendKeys(this.websiteInputField, websiteLink);
    }

    public async clickTranslateWebsiteButton() {
        await this.waitClick(this.translateWebsiteButton);
    }

    public async checkTranslatedWebsite(checkLink: string) {
        await this.clickTranslateWebsiteButton();
        await this.openTranslatedWebsite(checkLink);
    }

    public async openTranslatedWebsite(checkLink: string) {
        await browser.pause(3000);
        await this.switchToNextTab();
        await this.checkOpenedPage(checkLink);
        await this.closeTab();
    }

    public async checkAlert(alertText: string) {
        await this.waitElementVisible(this.getAlertText(alertText));
    }

    public async clickClearLinkField() {
        await this.waitClick(this.clearWebsiteFieldButton);
    }
}
