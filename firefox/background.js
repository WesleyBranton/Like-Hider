/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// First install initialization
function handleInstalled(details) {
    if (details.reason == 'install') {
        browser.storage.local.set({
            setting: {
                hideNotification: true,
                hideLikeCounter: false,
                hideLikeButton: false
            }
        });
    }
}

// Applies the user's settings
function applySettings() {
    removeCSS();
    let settings = browser.storage.local.get('setting');
    settings.then(addCSS);
}

// Create CSS rules
async function addCSS(item) {
    // Hide like notifications
    if (item.setting.hideNotification) {
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
    if (item.setting.hideLikeCounter) {
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
    if (item.setting.hideLikeButton) {
        css[2] = await browser.contentScripts.register({
            matches: [facebook, facebookOnion],
            css: [{
                file: 'styles/no_like_buttons.css'
            }],
            runAt: 'document_start',
            allFrames: true
        });
    }
}

// Clear CSS rules
function removeCSS() {
    for (i = 0; i < css.length; i++) {
        if (css[i]) {
            css[i].unregister();
            css[i] = null;
        }
    }
}

browser.runtime.onInstalled.addListener(handleInstalled);
browser.storage.onChanged.addListener(applySettings);
const facebook = '*://*.facebook.com/*';
const facebookOnion = '*://*.facebookcorewwwi.onion/*';
var css = [null, null, null];
applySettings();