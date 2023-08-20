# qa-auto-portfolio-project

**qa-auto-portfolio-project** created to check the functionality and appearance of the [Google Transalte](https://translate.google.com/) siteand works on the WebdriverIO automation framework. Autotests check the functionality of the site based on priority. <!--In addition to functional tests, there are also non-functional tests for checking appearance by comparing screenshots (UI Regression Tests)-->

> [!NOTE]
> The project was created to demonstrate my test automation skills, there was no goal to cover all functionality and views of Google Translate

## Features 
- Executing autotests separatly by suite name (Smoke/Regression<!-- /UI Comparison-->)
<!-- - UI Comparison autotests that allows to compare current view with predefined scrennshot 
ADD UI COMPARISON PHOTO
- Remote autotests run on CircleCI -->

## Setup project and run autotests locally ⚙️
### Precondition:
- Installed Chrome browser latest version
- Downloaded [Node.js and NPM](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac)

### Setup project:
1. Download project to your computer
2. Install node modules
```
npm install
```

### Run tests:
- To run **all tests** naviagte to the package.json and start script `run-all-test-cases` or use command:
```
wdio run ./wdio.conf_chrome.js
```

- Also you can run only **smoke** or **regression** tests using appropriate package.json scripts `run-smoke-test-cases` and `run-regression-test-cases` or by adding `--suite` to the command:
```
wdio run ./wdio.conf_chrome.js --suite=smoke_tests
```
<!-- ADD UI REGRESSION LATER -->

## Built With 🛠
- [TypeScript language](https://www.typescriptlang.org/) - Used to write automation test cases.
- [NPM](https://www.npmjs.com/) - For managing project's dependencies, including WebdriverIO and any other libraries required for the automation.
- [WebdriverIO](https://webdriver.io/uk/) - Serves as the core automation framework for the project, enabling the simulation of user interactions and testing scenarios on the web application.
<!-- - [Pixelmatch library](https://github.com/mapbox/pixelmatch) - is utilized for visual regression testing. It allows to compare screenshots of your app UI, detecting any unexpected visual differences. -->

## License 📋

```
MIT License

Copyright (c) 2023 jectoric

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```