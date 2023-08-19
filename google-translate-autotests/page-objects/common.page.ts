import { PageActions } from '../helpers/page-actions';

export class CommonPage extends PageActions {
    //-----------------------------------------------------------
    // ELEMENTS
    //-----------------------------------------------------------

    private selectTransalteTab(tabName: string) {
        return $(`button[aria-label="${tabName} translation"]`);
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async checkElementColor(element: any, expectedColor: string) {
        expect((await element.getCSSProperty('border-color')).parsed.hex).toEqual(expectedColor);
    };

    public async clickGoogleTransalteTab(tabName: string) {
        await this.waitClick(this.selectTransalteTab(tabName));
    };

    public async checkNextTabLink(checkLink: string) {
        await this.switchToNextTab();
        await this.checkOpenedPage(checkLink);
        await this.closeTab();
    }
}
