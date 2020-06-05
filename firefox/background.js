/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * First installation initialization
 * @param {Object} details 
 */
function handleInstalled(details) {
    if (details.reason == 'install') {
        browser.storage.local.set({
            setting: {
                hideNotification: true,
                hideLikeCounter: false,
                hideLikeButton: false,
                betterSponsor: false
            }
        });
    }
}

/**
 * Apply CSS rules
 * @async
 */
async function addCSS() {
    // Remove existing CSS rules
    removeCSS();

    // Load data from Storage API
    let setting = await browser.storage.local.get('setting');
    setting = setting.setting;

    // Hide like notifications
    if (setting.hideNotification) {
        css[0] = await browser.contentScripts.register({
            matches: [facebook, facebookOnion],
            css: [{
                file: 'styles/no_like_notifications.css'
            }],
            runAt: 'document_start',
            allFrames: true
        });
    }

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
        css[2] = await browser.contentScripts.register({
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

browser.runtime.onInstalled.addListener(handleInstalled);
browser.storage.onChanged.addListener(addCSS);
const facebook = '*://*.facebook.com/*';
const facebookOnion = '*://*.facebookcorewwwi.onion/*';
let css = [null, null, null];
addCSS();
