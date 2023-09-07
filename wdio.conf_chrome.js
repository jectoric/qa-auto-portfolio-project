const path = require('path');
const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');
global.downloadDir = path.join(__dirname, 'tempDownload');

exports.config = merge(wdioConf.config, {
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            browserVersion: 'stable',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                prefs: {
                    'intl.accept_languages': 'en,en_US',
                    directory_upgrade: true,
                    prompt_for_download: false,
                    'download.default_directory': downloadDir,
                },
                args: ['--window-size=1920,1080', `--disable-gpu`, '--lang=en-us', '--disable-dev-shm-usage', '--no-sandbox', '--headless'],
            },
        },
    ],
});
