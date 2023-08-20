'use strict';
import * as fs from 'fs';
const TIMEOUT = 10000;
const WAIT_FOR_SCRIPT: number = 500;

export class PageActions {
    //-----------------------------------------------------------
    // COOKIES AND TABS BASIC METHODS
    //-----------------------------------------------------------

    /**
     * This function will help to open any web page
     * @param {String} url | Web page URL address
     */
    public async openPage(url: string): Promise<void> {
        await browser.url(url);
        await this.checkOpenedPage(url);
    };

    /**
     * This function will clear all browser data
     */
    public async clearAllData(): Promise<void> {
        await browser.execute('try {window.sessionStorage.clear(); } catch(e) {}');
        await browser.execute('try {window.localStorage.clear(); } catch(e) {}');
        await browser.deleteCookies();
    };

    /**
     * This function will help to check if web page was opened
     * @param {String} url | Web page URL address
     * @param {Number} timeout | Web page URL address
     */
    protected async checkOpenedPage(url: string, timeout: number = TIMEOUT) {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = `The page ${url} was not opened within ${to}ms`;
        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes(url);
        }, { timeout: to, timeoutMsg: mess });
    }

    /**
     * This function will swith you to the next browser tab
     */
    protected async switchToNextTab(): Promise<void> {
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]);
    };

    /**
     * This function will swith you to the previous browser tab
     */
    protected async switchToPreviosTab(): Promise<void> {
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 2]);
    };

    /**
     * This function closes ccurrent browser tab
     */
    protected async closeTab(): Promise<void> {
        await browser.execute('window.close()');
        await this.switchToNextTab();
    };

    //-----------------------------------------------------------
    // WEB ELEMENTS INTERACTION BASIC METHODS
    //-----------------------------------------------------------

    /**
     * This function will help to wait until web element appear
     * @param {any} element | Web element locator
     * @param {String} message | Custom error message
     * @param {Number} timeout | Custom timeout
     */
    protected async waitElementPresent(element: any, message?: string, timeout: number = TIMEOUT): Promise<void> {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = message ? message : await element.selector + ' is not presented.';
        let EC = require('wdio-wait-for');
        await browser.waitUntil(EC.presenceOf(element), {
            timeout: to,
            timeoutMsg: mess,
        });
    };

    /**
     * This function will help to wait until web element disappear
     * @param {any} element | Web element locator
     * @param {String} message | Custom error message
     * @param {Number} timeout | Custom timeout
     */
    protected async waitElementIsNotPresent(element: any, message?: string, timeout: number = TIMEOUT): Promise<void> {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = message ? message : await element.selector + ' is presented.';
        let EC = require('wdio-wait-for');
        await browser.waitUntil(EC.stalenessOf(element), {
            timeout: to,
            timeoutMsg: mess,
        });
        await browser.pause(WAIT_FOR_SCRIPT);
    };

    /**
     * This function will help to wait until web element visible
     * @param {any} element | Web element locator
     * @param {String} message | Custom error message
     * @param {Number} timeout | Custom timeout
     */
    protected async waitElementVisible(element: any, message?: string, timeout: number = TIMEOUT): Promise<void> {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = message ? message : await element.selector + ' is not visible.';
        let EC = require('wdio-wait-for');
        await browser.waitUntil(EC.visibilityOf(element), {
            timeout: to,
            timeoutMsg: mess,
        });
    };

    /**
     * This function will help to wait until web element invisible
     * @param {any} element | Web element locator
     * @param {String} message | Custom error message
     * @param {Number} timeout | Custom timeout
     */
    protected async waitElementInvisible(element: any, message?: string, timeout: number = TIMEOUT): Promise<void> {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = message ? message : await element.selector + ' is presented.';
        await element.waitForDisplayed({ timeout: to, reverse: true, timeoutMsg: mess });
    };

    /**
     * This function will help to check if web element is clickable
     * @param {any} element | Web element locator
     * @param {String} message | Custom error message
     * @param {Number} timeout | Custom timeout
     */
    protected async waitElementClickable(element: any, message?: string, timeout: number = TIMEOUT): Promise<void> {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = message ? message : await element.selector + 'is not clickable.';
        await element.waitForClickable({ timeout: to, timeoutMsg: mess });
    };

    //-----------------------------------------------------------
    // WEB ELEMENTS INTERACTION ADVANCED METHODS
    //-----------------------------------------------------------

    /**
     * This function will help to clear input web element
     * @param {any} element | Web element locator
     */
    protected async waitAndClear(element: any): Promise<any> {
        try {
            await this.waitElementVisible(element);
            await element.doubleClick();
            while ((await element.getValue()).length !== 0) browser.keys('Backspace');
        } catch (error) {
            throw new Error(`Unable to clear ${element.name}: ${error}`);
        }
    };

    /**
     * This function will help to get web element text
     * @param {any} element | Web element locator
     */
    protected async waitGetText(element: any): Promise<any> {
        try {
            await this.waitElementVisible(element);
            return await element.getText();
        } catch (error) {
            throw new Error(`Unable to get ${element.name} element text: ${error}`);
        }
    };

    /**
     * This function will help to click on the web element
     * @param {any} element | Web element locator
     */
    protected async waitClick(element: any): Promise<any> {
        try {
            await this.waitElementVisible(element);
            await this.waitElementClickable(element);
            await element.click();
        } catch (error) {
            throw new Error(`Unable to click on ${await element.selector} element: ${error}`);
        }
    };

    /**
     * This function will help to fill the web element with text
     * @param {any} element | Web element locator
     * @param {String} inputValue | Text to input
     */
    protected async waitSendKeys(element: any, inputValue: string): Promise<void> {
        try {
            await this.waitAndClear(element);
            await element.addValue(inputValue);
        } catch (error) {
            throw new Error(`Unable to fill ${await element.selector} element with ${inputValue} value: ${error}`);
        }
    };

    /**
     * This function waits for a web element, clears its content and fills it with the provided text
     * @param {any} element - Web element locator.
     * @param {string} inputValue - Text to input into the element.
     */
    protected async waitClearSendKeys(element: any, inputValue: string): Promise<void> {
        try {
            await this.waitAndClear(element);
            await element.setValue(inputValue);
            await browser.pause(WAIT_FOR_SCRIPT);
        } catch (error) {
            throw new Error(`Unable to fill ${await element.selector} element with ${inputValue} value: ${error}`);
        }
    };

    /**
     * This function waits for a web element to become visible, and then pastes the text from the clipboard.
     * @param {any} element - Web element locator.
     * @param {string} message - Optional message for better error reporting.
     */
    protected async pasteTextFromClipboard(element: any, message?: string): Promise<void> {
        try {
            await this.waitElementVisible(element, message);
            await browser.keys(["Command", "v"]); // Adjust the key combination for different platforms
        } catch (error) {
            throw new Error(`Unable to paste text from clipboard: ${error}`);
        }
    }


    //-----------------------------------------------------------
    // FILES INTERACTION METHODS
    //-----------------------------------------------------------

    /**
     * This function waits for a file to exist at the specified path within the given timeout period.
     * @param {string} filePath | The path to the file being checked
     * @param {number} timeout | Custom timeout
     */
    protected async waitForFileExists(filePath: string, timeout: number = TIMEOUT): Promise<void> {
        let to = timeout ? timeout : browser.config.waitforTimeout;
        let mess = `The file ${filePath} did not exist within ${timeout}ms`;
        await browser.waitUntil(async () => {
            try {
                fs.accessSync(filePath);
                return true;
            } catch (error) {
                return false;
            }
        }, { timeout: to, timeoutMsg: mess });
    }
};
