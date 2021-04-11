/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Apply CSS rules
 * @async
 */
async function addCSS() {
    // Remove existing CSS rules
    removeCSS();

    // Load data from Storage API
    const { setting } = await browser.storage.local.get('setting');

    // Hide like notifications
    if (!setting || setting.hideNotification == undefined || setting.hideNotification) {
        css[0] = await browser.contentScripts.register({
            matches: [facebook, facebookOnion],
            css: [{
                file: 'styles/no_like_notifications.css'
            }],
            runAt: 'document_start',
            allFrames: true
        });
    }

    // Stop processing if no settings exist
    if (!setting) return false;

    // Hide post/comment like counter
    if (setting.hideLikeCounter) {
        css[1] = await browser.contentScripts.register({
            matches: [facebook, facebookOnion],
            css: [{
                file: 'styles/no_like_counters.css'
            }],
            runAt: 'document_start',
            allFrames: true
        });
    }

    // Hide post/comment like button
    if (setting.hideLikeButton) {
        css[2] = await browser.contentScripts.register({
            matches: [facebook, facebookOnion],
            css: [{
                file: 'styles/no_like_buttons.css'
            }],
            runAt: 'document_start',
            allFrames: true
        });
    }

    // Improve "Sponsored" content label
    if (setting.betterSponsor) {
        css[3] = await browser.contentScripts.register({
            matches: [facebook, facebookOnion],
            css: [{
                file: 'styles/better_sponsor.css'
            }],
            runAt: 'document_start',
            allFrames: true
        });
    }
}

/**
 * Clear existing CSS rules
 */
function removeCSS() {
    for (i = 0; i < css.length; i++) {
        if (css[i]) {
            css[i].unregister();
            css[i] = null;
        }
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
                url: 'https://addons.wesleybranton.com/like-hider/feature/new/bettersponsors'
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

browser.storage.onChanged.addListener(addCSS);
browser.runtime.onInstalled.addListener(handleInstalled);
browser.pageAction.onClicked.addListener(openOptions);
const facebook = '*://*.facebook.com/*';
const facebookOnion = '*://*.facebookcorewwwi.onion/*';
const css = [null, null, null, null];
addCSS();
