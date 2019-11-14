/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function saveOptions() {
    browser.storage.local.set({
        setting: {
            hideNotification: document.getElementById('hideNotification').checked,
            hideLikeCounter: document.getElementById('hideLikeCounter').checked,
            hideLikeButton: document.getElementById('hideLikeButton').checked
        }
    });
}

function restoreOptions(item) {
    document.getElementById('hideNotification').checked = item.setting.hideNotification;
    document.getElementById('hideLikeCounter').checked = item.setting.hideLikeCounter;
    document.getElementById('hideLikeButton').checked = item.setting.hideLikeButton;
}

browser.storage.local.get('setting', restoreOptions);
document.querySelector('form').addEventListener('change', saveOptions);