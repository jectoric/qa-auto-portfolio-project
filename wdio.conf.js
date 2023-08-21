const path = require('path')
const fs = require('fs')
global.downloadDir = path.join(__dirname, 'tempDownload');

exports.config = {
    runner: 'local',
    autoCompileOpts: {
        tsNodeOpts: {
            project: './tsconfig.json'
        }
    },
    suites: {
        smoke_tests: ['./google-translate-autotests/tests/functional-autotests/smoke-tests/*.spec.ts'],
        regression_tests: ['./google-translate-autotests/tests/functional-autotests/regression-tests/*.spec.ts'],
        ui_comparison_tests: ['./google-translate-autotests/tests/non-functional-autotests/ui-comparison-tests/*.spec.ts']
    },
    maxInstances: 10,
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        capabilities: [{
            browserName: 'chrome',
            maxInstances: 1,
        }],
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

    onPrepare: function (config, capabilities) {
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }
    },

    onComplete: function () {
        function rmdir(dir) {
            var list = fs.readdirSync(dir);
            for (var i = 0; i < list.length; i++) {
                var filename = path.join(dir, list[i]);
                var stat = fs.statSync(filename);
                if (filename == "." || filename == "..") {
                } else if (stat.isDirectory()) {
                    rmdir(filename);
                } else {
                    fs.unlinkSync(filename);
                }
            }
            fs.rmdirSync(dir);
        }
        rmdir(downloadDir)
    }
}