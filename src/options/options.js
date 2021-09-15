/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Save settings to Storage API
 */
function saveOptions() {
    browser.storage.local.set({
        hideNotification: (document.settings.notifications.value == 'true'),
        hideLikeCounter: (document.settings.counters.value == 'true'),
        hideLikeButton: (document.settings.buttons.value == 'true')
    });

    updateDemo();
}

/**
 * Load options from settings
 */
function restoreOptions(setting) {
    // Update GUI
    if (setting.hideNotification != undefined) document.settings.notifications.value = setting.hideNotification;
    if (setting.hideLikeCounter != undefined) document.settings.counters.value = setting.hideLikeCounter;
    if (setting.hideLikeButton != undefined) document.settings.buttons.value = setting.hideLikeButton;

    updateDemo();
}

/**
 * Update the demo post appearance
 */
function updateDemo() {
    const post = document.getElementById('post');

    post.className = '';
    if (document.settings.counters.value == 'true') post.classList.add('hide-counter');
    if (document.settings.buttons.value == 'true') post.classList.add('disable-like');
}

/**
 * Check if the options page is being loaded in a new tab
 */
function pageType() {
    if (!window.location.href.includes('type=ui')) {
        document.body.classList.add('browser-style-page');
    }
}

pageType();
document.body.classList.add(BROWSERSTRINGS[runningOn].toLowerCase());
i18nParse();
document.title = browser.i18n.getMessage('optionsTitle', browser.i18n.getMessage('extensionName'));
browser.storage.local.get(restoreOptions);
document.querySelector('form').addEventListener('change', saveOptions);
