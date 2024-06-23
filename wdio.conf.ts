import { generateAllureReport, removeAllureDirectories } from '@reporter/allure-reporter';
import { removeDirectory } from '@helpers/file-actions';

const sharedState = require('@reporter/SharedState')
const path = require('path');
const fs = require('fs');

global.downloadDir = path.join(__dirname, 'tempDownload');

// fix config issue
export const config: WebdriverIO.Config = {
    runner: 'local',
    autoCompileOpts: {
        tsNodeOpts: {
            project: './tsconfig.json'
        }
    },
    suites: {
        smoke_tests: ['./google-translate-autotests/tests/functional-autotests/smoke-tests/*.spec.ts'],
        regression_tests: ['./google-translate-autotests/tests/functional-autotests/regression-tests/*.spec.ts'],
        ui_comparison_tests: ['./google-translate-autotests/tests/non-functional-autotests/ui-comparison-tests/**/*.spec.ts']
    },
    maxInstances: 10,
    logLevel: 'silent',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'jasmine',
    reporters: ['spec', ['allure', {
        outputDir: './allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],
    jasmineOpts: {
        framework: 'Jasmine',
        jasmineOpts: {
            defaultTimeoutInterval: 120000,
        },
        autoCompileOpts: {
            autoCompile: true,
            tsNodeOpts: {
                transpileOnly: true,
                project: 'tsconfig.json'
            },
        }
    },

    async onPrepare() {
        removeAllureDirectories();

        // make function for this and move to helpers
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }
    },

    async beforeTest() {
        sharedState.clearScreenshots();
    },

    async afterTest(test, context, { error }) {
        if (error) {
            const screenshot = await driver.takeScreenshot();
            sharedState.setScreenshot(test.title, screenshot)
        }
    },

    async onComplete() {
        await removeDirectory(downloadDir);
        await generateAllureReport();
    },
}