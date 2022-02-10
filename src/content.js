/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Request full CSS update
 */
function fullUpdate() {
    browser.runtime.sendMessage({action: 'fullUpdate'});
}

/**
 * Request partial CSS update based on detected storage changes
 * @param {object} changes
 * @param {string} area
 */
function partialUpdate(changes, area) {
    if (area == 'local') {
        browser.runtime.sendMessage({
            action: 'partialUpdate',
            changes: changes
        });
    }
}

if (typeof browser != "object") browser = chrome;

fullUpdate();
browser.storage.onChanged.addListener(partialUpdate);