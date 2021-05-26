/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Generate and cache new CSS based on user settings
 * @param {Object} settings
 */
function updateCSS(settings) {
    let newCSS = '';

    // Hide like notifications
    if (!settings || settings.hideNotification == undefined || settings.hideNotification) {
        newCSS += code.hideNotification;
    }

    if (settings) {
        // Hide post/comment like counter
        if (settings.hideLikeCounter) {
            if (newCSS.length > 0) newCSS += '\n\n';
            newCSS += code.hideLikeCounter;
        }

        // Hide post/comment like button
        if (settings.hideLikeButton) {
            if (newCSS.length > 0) newCSS += '\n\n';
            newCSS += code.hideLikeButton;
        }

        // Improve "Sponsored" content label
        if (settings.betterSponsor) {
            if (newCSS.length > 0) newCSS += '\n\n';
            newCSS += code.betterSponsor;
        }
    }

    css = newCSS;
    loaded = true;
    broadcastToPorts();
}

/**
 * Reload user settings from Storage API
 * @param {boolean} validate
 */
function reloadSettings(validate) {
    browser.storage.local.get((data) => {
        if (validate) {
            validateAndUpdate(data);
        } else {
            updateCSS(data);
        }
    });
}

/**
 * Migrate Storage API data to new model (if required)
 * @param {Object} data
 */
function validateAndUpdate(data) {
    if (data.setting) {
        browser.storage.local.clear(() => {
            browser.storage.local.set(data.setting, () => {
                reloadSettings(false);
            });
        });
    } else {
        updateCSS(data);
    }
}

/**
 * Open connection to content script
 * @param {Object} port
 */
function registerPort(port) {
    while (ports[port.name]) {
        port.name = parseInt(port.name) + 1 + '';
    }

    ports[port.name] = port;
    port.onDisconnect.addListener(unregisterPort);
    if (loaded) port.postMessage(css);
}

/**
 * Close connection to content script
 * @param {Object} port
 */
function unregisterPort(port) {
    delete ports[port.name];
}

/**
 * Send CSS to all content scripts
 */
function broadcastToPorts() {
    for (let port of Object.values(ports)) {
        port.postMessage(css);
    }
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
                url: 'https://addons.wesleybranton.com/addon/like-hider-for-facebook/update/v3_0'
            });
        }
    }
}

/**
 * Open options page
 */
function openOptions() {
    browser.tabs.create({
        url: 'options/options.html'
    });
}

let css = '';
let loaded = false;
const ports = {};

browser.runtime.onConnect.addListener(registerPort);
browser.storage.onChanged.addListener(() => { reloadSettings(false) });
browser.runtime.onInstalled.addListener(handleInstalled);
if (runningOn == browsers.FIREFOX) browser.pageAction.onClicked.addListener(openOptions);

reloadSettings(true);
