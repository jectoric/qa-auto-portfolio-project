import allure from '@wdio/allure-reporter';
import { PageActions } from '@helpers/page-actions';
import { Tabs } from '@data/web-tabs';

class CommonPage extends PageActions {
    //-----------------------------------------------------------
    // ELEMENTS
    //-----------------------------------------------------------

    private selectTransalteTab(tabName: Tabs) {
        return $(`button[aria-label="${tabName} translation"]`);
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async checkElementColor(element: any, expectedColor: string) {
        await allure.step(`When I check element color is "${expectedColor}"`, async () => {
            expect((await element.getCSSProperty('border-color')).parsed.hex).toEqual(expectedColor);
        });
    }

    public async clickGoogleTransalteTab(tabName: Tabs) {
        await allure.step(`When I click Google Transalte Tab "${tabName}"`, async () => {
            await this.waitClick(this.selectTransalteTab(tabName));
        });
    }

    public async checkNextTabLink(checkLink: string) {
        await allure.step(`When I check opened link is "${checkLink}" on the next tab`, async () => {
            await this.switchToNextTab();
            await this.checkOpenedPage(checkLink);
            await this.closeTab();
        });
    }
}

export default new CommonPage();
