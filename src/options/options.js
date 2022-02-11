/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Save single option to the browser storage
 * @param {Event} event
 */
function saveOption(event) {
    const key = event.target.name;
    const item = {};
    item[key] = (document.settings[key].value == 'true');

    browser.storage.local.set(item);
    updateDemo();
}

/**
 * Load options from settings
 */
function restoreOptions(setting) {
    for (const key of Object.keys(defaults)) {
        if (typeof setting[key] != 'boolean') {
            setting[key] = defaults[key];
        }

        document.settings[key].value = setting[key];
    }

    updateDemo();
}

/**
 * Update the demo post appearance
 */
function updateDemo() {
    const post = document.getElementById('post');

    post.className = '';
    if (document.settings.hideLikeCounter.value == 'true') post.classList.add('hide-counter');
    if (document.settings.hideLikeButton.value == 'true') post.classList.add('disable-like');
}

/**
 * Check if the options page is being loaded in a new tab
 */
function pageType() {
    if (!window.location.href.includes('type=ui')) {
        document.body.classList.add('browser-style-page');
    }
}

const defaults = {
    hideNotification: true,
    hideLikeCounter: false,
    hideLikeButton: false
};

pageType();
document.body.classList.add(BROWSERSTRINGS[runningOn].toLowerCase());
i18nParse();
document.title = browser.i18n.getMessage('optionsTitle', browser.i18n.getMessage('extensionName'));
browser.storage.local.get(restoreOptions);
document.querySelector('form').addEventListener('change', saveOption);
