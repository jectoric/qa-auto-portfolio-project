import allure from '@wdio/allure-reporter';
import commonPage from '@page-objects/common.page';
import { PageActions } from '@helpers/page-actions';
import { Tabs } from '@data/web-tabs';
import { Languages } from '@data/languages';
import { DropdownTypes } from '@data/dropdown-types';

class SelectLanguagePage extends PageActions {
    //-----------------------------------------------------------
    // BASIC SELECTORS
    //-----------------------------------------------------------

    private tabSelector(tabName: Tabs) {
        return `//h1[text()='${tabName} translation']/following-sibling::div`;
    }

    private moreLanguages(dropdownType: DropdownTypes) {
        switch (dropdownType) {
            case DropdownTypes.FROM:
                return '//*[@aria-label="More source languages"]';
            case DropdownTypes.TO:
                return '//*[@aria-label="More target languages"]';
        }
    }

    //-----------------------------------------------------------
    // PAGE ELEMENTS
    //-----------------------------------------------------------

    private selectLanguageTab(tabName: Tabs, dropdownType: DropdownTypes, language: Languages) {
        return $(`${this.tabSelector(tabName)}${this.moreLanguages(dropdownType)}/ancestor::div[1]//span[text()='${language}']/ancestor::button`);
    }

    private selectedLanguage(tabName: Tabs, dropdownType: DropdownTypes, language: Languages) {
        return $(`${this.tabSelector(tabName)}${this.moreLanguages(dropdownType)}/ancestor::div[1]//span[text()='${language}']/ancestor::span[1]/following-sibling::span/span`);
    }

    private openLanguagesDropdown(tabName: Tabs, dropdownType: DropdownTypes) {
        return $(`${this.tabSelector(tabName)}${this.moreLanguages(dropdownType)}`);
    }

    private swapLanguagesButton(tabName: Tabs) {
        return $(`${this.tabSelector(tabName)}//button[contains(@aria-label, "Swap languages")]`);
    }

    private searchLanguagesInput(tabName: Tabs, dropdownType: DropdownTypes) {
        return $(`${this.tabSelector(tabName)}//div[text()="Translate ${dropdownType.toLowerCase()}"]//ancestor::div[2]//input[@placeholder="Search languages"]`);
    }

    private searchLanguageOption(language: Languages) {
        return $(`//input[@aria-label="Search languages"]/ancestor::div[2]//span[text()='${language}']`);
    }

    //-----------------------------------------------------------
    // FUNCTIONS
    //-----------------------------------------------------------

    public async checkSelectedLanguage(tabName: Tabs, dropdownType: DropdownTypes, language: Languages, color: string = '#1a73e8') {
        await allure.step(`When I check selected language is "${language}" on tab "${tabName}"`, async () => {
            await this.waitElementVisible(this.selectedLanguage(tabName, dropdownType, language));
            await commonPage.checkElementColor(this.selectedLanguage(tabName, dropdownType, language), color);
        });
    }

    public async clickLanguageTab(tabName: Tabs, dropdownType: DropdownTypes, language: Languages) {
        await allure.step(`When I select language "${language}" on tab "${tabName}"`, async () => {
            await this.waitClick(this.selectLanguageTab(tabName, dropdownType, language));
            await this.checkSelectedLanguage(tabName, dropdownType, language, '#174ea6');
        });
    }

    public async clickSwapLanguages(tabName: Tabs) {
        await allure.step(`When I click on the swap languages tab`, async () => {
            await this.waitClick(this.swapLanguagesButton(tabName));
        });
    }

    public async searchAndSelectLanguage(tabName: Tabs, dropdownType: DropdownTypes, language: Languages) {
        await allure.step(`When I search and select language "${language}" on tab "${tabName}"`, async () => {
            await this.waitClick(this.openLanguagesDropdown(tabName, dropdownType));
            await this.waitClearSendKeys(this.searchLanguagesInput(tabName, dropdownType), language);
            await this.waitClick(this.searchLanguageOption(language));
            await this.waitElementIsNotPresent(this.searchLanguageOption(language));
            await this.checkSelectedLanguage(tabName, dropdownType, language);
        });
    }

    public async selectFromToLanguages(tabName: Tabs, fromLanguage: Languages, toLanguage: Languages) {
        await allure.step(`When I select translate from "${fromLanguage}" to "${toLanguage}" on "${tabName}" tab`, async () => {
            await this.searchAndSelectLanguage(tabName, DropdownTypes.FROM, fromLanguage);
            await this.searchAndSelectLanguage(tabName, DropdownTypes.TO, toLanguage);
        });
    }
}

export default new SelectLanguagePage();
