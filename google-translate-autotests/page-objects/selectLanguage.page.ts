import allure from '@wdio/allure-reporter';
import { CommonPage } from './common.page';
import { PageActions } from '../helpers/page-actions';

const commonPage: CommonPage = new CommonPage();

export class SelectLanguagePage extends PageActions {
    //-----------------------------------------------------------
    // BASIC SELECTORS
    //-----------------------------------------------------------

    private tabSelector(tabName: string) {
        return `//h1[text()='${tabName} translation']/following-sibling::div`
    }

    private moreLanguages(dropdownType: string) {
        switch (dropdownType) {
            case 'From':
                return '//*[@aria-label="More source languages"]';
            case 'To':
                return '//*[@aria-label="More target languages"]';
        }
    }

    //-----------------------------------------------------------
    // PAGE ELEMENTS
    //-----------------------------------------------------------

    private selectLanguageTab(tabName: string, dropdownType: string, language: string) {
        return $(`${this.tabSelector(tabName)}${this.moreLanguages(dropdownType)}/ancestor::div[1]//span[text()='${language}']/ancestor::button`);
    }

    private selectedLanguage(tabName: string, dropdownType: string, language: string) {
        return $(`${this.tabSelector(tabName)}${this.moreLanguages(dropdownType)}/ancestor::div[1]//span[text()='${language}']/ancestor::span[1]/following-sibling::span/span`);
    }

    private openLanguagesDropdown(tabName: string, dropdownType: string) {
        return $(`${this.tabSelector(tabName)}${this.moreLanguages(dropdownType)}`);
    }

    private swapLanguagesButton(tabName: string) {
        return $(`${this.tabSelector(tabName)}//button[@aria-label="Swap languages (Cmd+Shift+S)"]`);
    }

    private searchLanguagesInput(tabName: string, dropdownType: string) {
        return $(`${this.tabSelector(tabName)}//div[text()="Translate ${dropdownType.toLowerCase()}"]//ancestor::div[2]//input[@placeholder="Search languages"]`);
    }

    private searchLanguageOption(language: string) {
        return $(`//input[@aria-label="Search languages"]/ancestor::div[2]//span[text()='${language}']`);
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async checkSelectedLanguage(tabName: string, dropdownType: string, language: string, color: string = '#1a73e8') {
        await allure.step(`When I check selected language is "${language}" on tab "${tabName}"`, async () => {
            await this.waitElementVisible(this.selectedLanguage(tabName, dropdownType, language));
            await commonPage.checkElementColor(this.selectedLanguage(tabName, dropdownType, language), color);
        });
    }

    public async clickLanguageTab(tabName: string, dropdownType: string, language: string) {
        await allure.step(`When I select language "${language}" on tab "${tabName}"`, async () => {
            await this.waitClick(this.selectLanguageTab(tabName, dropdownType, language));
            await this.checkSelectedLanguage(tabName, dropdownType, language, '#174ea6');
        });
    }

    public async clickSwapLanguages(tabName: string) {
        await allure.step(`When I click on the swap languages tab`, async () => {
            await this.waitClick(this.swapLanguagesButton(tabName));
        });
    }

    public async searchAndSelectLanguage(tabName: string, dropdownType: string, language: string) {
        await allure.step(`When I search and select language "${language}" on tab "${tabName}"`, async () => {
            await this.waitClick(this.openLanguagesDropdown(tabName, dropdownType));
            await this.waitClearSendKeys(this.searchLanguagesInput(tabName, dropdownType), language);
            await this.waitClick(this.searchLanguageOption(language));
            await this.waitElementIsNotPresent(this.searchLanguageOption(language));
            await this.checkSelectedLanguage(tabName, dropdownType, language);
        });
    }

    public async selectFromToLanguages(tabName: string, fromLanguage: string, toLanguage: string) {
        await allure.step(`When I select translate from "${fromLanguage}" to "${toLanguage}" on "${tabName}" tab`, async () => {
            await this.searchAndSelectLanguage(tabName, 'From', fromLanguage);
            await this.searchAndSelectLanguage(tabName, 'To', toLanguage);
        });
    }
}
