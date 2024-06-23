import allure from '@wdio/allure-reporter';

export const takeScreenShot = async function takeScreenShot() {
    try {
        const screenshotBuffer = await browser.takeScreenshot();
        allure.addAttachment('CLICK-ME! - SCREENSHOT', Buffer.from(screenshotBuffer, 'base64'), 'image/png');
        console.log('info', `a screenshot has been taken successfully`);
    } catch (error) {
        throw new Error(`ERROR - failed to take a screenshot:  ${error}`);
    }
};
