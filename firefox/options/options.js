/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Save settings to Storage API
 */
function saveOptions() {
    browser.storage.local.set({
        setting: {
            hideNotification: toBoolean(document.settings.notifications.value),
            hideLikeCounter: toBoolean(document.settings.counters.value),
            hideLikeButton: toBoolean(document.settings.buttons.value),
            betterSponsor: toBoolean(document.settings.sponsor.value)
        }
    });
}

/**
 * Load options from settings
 * @async
 */
async function restoreOptions() {
    // Load data from Storage API
    let setting = await browser.storage.local.get('setting');
    setting = setting.setting;

    // Update GUI
    document.settings.notifications.value = setting.hideNotification;
    document.settings.counters.value = setting.hideLikeCounter;
    document.settings.buttons.value = setting.hideLikeButton;
    document.settings.sponsor.value = setting.betterSponsor;
}

/**
 * Convert string to boolean
 * @param {string} string 
 */
function toBoolean(string) {
    if (string == 'true') {
        return true;
    } else {
        return false;
    }
}

restoreOptions();
document.querySelector('form').addEventListener('change', saveOptions);
