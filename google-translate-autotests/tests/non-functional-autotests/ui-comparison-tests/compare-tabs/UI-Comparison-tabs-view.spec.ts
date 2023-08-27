'use strict';
import * as constants from '../../../../helpers/constants';
import { PageActions } from '../../../../helpers/page-actions';
import { CommonPage } from '../../../../page-objects/common.page';
import testData from './UI-Comparison-tabs-data';

describe('Google Translate | Tabs UI Regression Tests', () => {
    const commonPage: CommonPage = new CommonPage();
    const pageActions: PageActions = new PageActions();

    beforeAll(async () => {
        await pageActions.openPage(constants.BaseURL);
    });

    afterAll(async () => {
        await pageActions.clearAllData();
    });

    testData.tabsTests.forEach((testDataItem) => {
        const { testName, tabName, referenceImagePath, tempScreenshotPath, diffScreenshotPath } = testDataItem;
        it(testName, async () => {
            await commonPage.clickGoogleTransalteTab(tabName);
            await pageActions.compareScreenshotWithReference(referenceImagePath, tempScreenshotPath, diffScreenshotPath);
        });
    });
});
