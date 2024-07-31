/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Refresh CSS files for tab
 * @param {number} tabId
 * @param {Array} keys
 */
function refreshCSS(tabId, keys) {
    browser.storage.local.get(keys, (settings) => {
        for (const key of keys) {
            if (typeof settings[key] != 'boolean') {
                settings[key] = defaults[key];
            }

            removeCSS(tabId, key, () => {
                if (settings[key]) {
                    addCSS(tabId, key);
                }
            });
        }
    });
}

/**
 * Remove CSS file from tab
 * @param {number} tabId
 * @param {string} cssName
 * @param {Function} callback
 */
 function removeCSS(tabId, cssName, callback) {
    browser.tabs.removeCSS(tabId, {
        file: 'css/' + cssName + '.css'
    }, callback);
}

/**
 * Add CSS file to tab
 * @param {number} tabId
 * @param {string} cssName
 */
function addCSS(tabId, cssName) {
    browser.tabs.insertCSS(tabId, {
        file: 'css/' + cssName + '.css'
    });
}

/**
 * Handle installation
 * @param {Object} details
 */
 function handleInstalled(details) {
    if (details.reason == 'install') {
        openOptions();
    } else if (details.reason == 'update') {
        const previousVersion = parseFloat(details.previousVersion);
        if (previousVersion < 3) {
            browser.tabs.create({
                url: `${webBase}/update/v3_0`
            });
        }
    }
}

/**
 * Open options page
 */
 function openOptions() {
    browser.runtime.openOptionsPage();
}

/**
 * Set up uninstall page
 */
 function setUninstallPage() {
    getSystemDetails((details) => {
        browser.runtime.setUninstallURL(`${webBase}/uninstall/?browser=${details.browser}&os=${details.os}&version=${details.version}`);
    });
}

/**
 * Send system details to callback
 * @param {Function} callback
 */
 function getSystemDetails(callback) {
    browser.runtime.getPlatformInfo((platform) => {
        callback({
            browser: (isChrome) ? 'chromium' : 'firefox',
            version: browser.runtime.getManifest().version,
            os: platform.os
        });
    });
}

/**
 * Load the content scripts into existing tabs if they are not already loaded (only required for Chromium MV3)
 */
function loadContentScripts() {
    if (typeof browser.storage.session == 'object') {
        browser.storage.session.get(['firstRunComplete'], (data) => {
            if (!data.firstRunComplete) {
                browser.tabs.query({
                    url: ['*://*.facebook.com/*']
                }, (tabs) => {
                    for (const t of tabs) {
                        browser.scripting.executeScript({
                            files: ['content.js'],
                            target: {
                                tabId: t.id
                            }
                        });
                    }
                });

                browser.storage.session.set({
                    firstRunComplete: true
                });
            }
        });
    }
}

/**
 * Handle incoming messages from content scripts
 * @param {object} message
 * @param {object} sender
 * @param {Function} sendResponse
 */
 function handleMessage(message, sender, sendResponse) {
    switch (message.action) {
        case 'fullUpdate':
            refreshCSS(sender.tab.id, Object.keys(defaults));
            break;
        case 'partialUpdate':
            refreshCSS(sender.tab.id, Object.keys(message.changes));
            break;
        case 'feedback':
            openFeedback();
            break;
    }
}

/**
 * Convert Firefox formatted CSS injection information to Chromium format
 * @param {number} tabId
 * @param {object} cssInjection
 * @returns cssInjection
 */
function convertCSSInjection(tabId, cssInjection) {
    return {
        files: [cssInjection.file],
        target: {
            tabId: tabId
        }
    };
}

/**
 * Open feedback window
 */
function openFeedback() {
    getSystemDetails((details) => {
        browser.windows.create({
            height: 700,
            width: 450,
            type: browser.windows.CreateType.PANEL,
            url: `${webBase}/feedback/?browser=${details.browser}&os=${details.os}&version=${details.version}`
        });
    });
}

const isChrome = typeof browser != "object";
const webBase = 'https://addons.wesleybranton.com/addon/like-hider-for-facebook';
const defaults = {
    hideNotification: true,
    hideLikeCounter: false,
    hideLikeButton: false
};

// Convert Chrome API to Browser API format
if (isChrome) {
    browser = chrome;
    browser.tabs.insertCSS = (tabId, cssInjection, callback) => { browser.scripting.insertCSS(convertCSSInjection(tabId, cssInjection), callback); };
    browser.tabs.removeCSS = (tabId, cssInjection, callback) => { browser.scripting.removeCSS(convertCSSInjection(tabId, cssInjection), callback); };
    browser.pageAction = browser.action;
}

browser.runtime.onMessage.addListener(handleMessage);
browser.pageAction.onClicked.addListener(openOptions);
browser.runtime.onInstalled.addListener(handleInstalled);

loadContentScripts();
setUninstallPage();