/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function saveOptions() {
    browser.storage.local.set({
        setting: {
            hideNotification: document.settings.notifications.value,
            hideLikeCounter: document.settings.counters.value,
            hideLikeButton: document.settings.buttons.value
        }
    });
}

function restoreOptions(item) {
    document.settings.notifications.value = item.setting.hideNotification;
    document.settings.counters.value = item.setting.hideLikeCounter;
    document.settings.buttons.value = item.setting.hideLikeButton;
}

browser.storage.local.get('setting', restoreOptions);
document.querySelector('form').addEventListener('change', saveOptions);