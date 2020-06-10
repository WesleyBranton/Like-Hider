/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Save settings to Storage API
 */
function saveOptions() {
    browser.storage.local.set({
        setting: {
            hideNotification: (document.settings.notifications.value == 'true'),
            hideLikeCounter: (document.settings.counters.value == 'true'),
            hideLikeButton: (document.settings.buttons.value == 'true'),
            betterSponsor: (document.settings.sponsor.value == 'true')
        }
    });
}

/**
 * Load options from settings
 * @async
 */
async function restoreOptions() {
    // Load data from Storage API
    const { setting } = await browser.storage.local.get('setting');
    if (!setting) return false;

    // Update GUI
    if (setting.hideNotification != undefined) document.settings.notifications.value = setting.hideNotification;
    if (setting.hideLikeCounter != undefined) document.settings.counters.value = setting.hideLikeCounter;
    if (setting.hideLikeButton != undefined) document.settings.buttons.value = setting.hideLikeButton;
    if (setting.betterSponsor != undefined) document.settings.sponsor.value = setting.betterSponsor;
}

restoreOptions();
document.querySelector('form').addEventListener('change', saveOptions);
