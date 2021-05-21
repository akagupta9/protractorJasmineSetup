import { Config, browser } from 'protractor';
import { CommonUtilities } from './Utilities/commonUtilities';
//import { join } from 'path';
//import { async } from 'q';

let ptor = require('protractor');
// let suites = require(join(process.cwd(), 'suite.json'));

// var allSuites = {};
// for (let suite in suites) {
//     allSuites[suite] = suites[suite].split(',');
// }

export let config: Config = {
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    /**
     *  if multiCapabilities is defined, the runner will ignore the capabilities configuration.
     * disable-infobars : To prevent  "Chrome is being controlled by automated test software". on browser
     * --start-maximized : Starts the browser maximized, regardless of any previous settings
     */

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-web-security', 'disable-infobars=true', '--start-maximized']
        }
    },

    // multiCapabilities: [
    //     {
    //         browserName: 'chrome',
    //         chromeOptions: {
    //             args: ['disable-web-security', 'disable-infobars=true', '--start-maximized']
    //         }
    //     },
    //     {
    //         'browserName': 'firefox',
    //         'moz:firefoxOptions': {
    //             'args': ['--safe-mode']
    //         }
    //     }
    // ],

    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
    },
    allScriptsTimeout: 45000,
    suites: {
        testFile1: "./specs/spec1.js",
        testFile2: "./specs/spec2.js",
        testFile3: "./specs/spec3.js",
        testFile4: "./specs/spec4.js",
        testFile5: "./specs/spec5.js"
    },

    params: {
        implicitWait: 10000,
        pageLoadOutTime: 60000
    },

    beforeLaunch: async () => {
        /*
        *callback function run before any environment setup. 
        */
    },

    onPrepare: async () => {
        /**A callback function called once protractor is ready and available, and before the specs are executed.
         * If multiple capabilities are being run, this will run once per capability. 
         * Browser will initialize here
         *  the global variable protractor object will be set up, and globals from the test framework will be available.
         * called once per capability
         */
        browser.manage().deleteAllCookies();
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(+ptor.browser.params.implicitWait);
        browser.manage().timeouts().pageLoadTimeout(+ptor.browser.params.pageLoadOutTime);
        await generateReport();
    },

    onComplete: async () => {
        /**
         * callback function called once tests are finished
         * tests will be done but global objects will still be available
         */
        ptor.browser.quit();
    },

    onCleanUp: async () => {
        /**
         * callback function called once the tests have finished running and the WebDriver instance has been shut down
         * called once per capability
         */
    },

    afterLaunch: async () => {
        /**
         * This is called only once before the program exits (after onCleanUp).
         */
    }
}

async function generateReport() {
    let currentDateTime = new CommonUtilities().getCurrentDateTimeAsString();
    var HtmlReporter = require('protractor-beautiful-reporter');
    jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: `Reports/${currentDateTime}`,
        takeScreenShotsOnlyForFailedSpecs: true,
        excludeSkippedSpecs: true,
        screenshotsSubfolder: 'images',
        docTitle: 'my reporter',
        jsonsSubfolder: 'jsons'
    }).getJasmine2Reporter());
}