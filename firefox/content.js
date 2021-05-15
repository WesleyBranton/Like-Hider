/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Update CSS on page
 * @param {String} css
 */
function injectCSS(css) {
    let sheet = document.getElementById('like-hider-for-facebook-css');

    if (!document.head) {
        document.onreadystatechange = () => {
            if (document.readyState == 'interactive') {
                injectCSS(css);
            }
        }
        return;
    }

    if (!sheet) {
        sheet = document.createElement('style');
        sheet.setAttribute('type', 'text/css');
        sheet.id = 'like-hider-for-facebook-css';
        document.head.appendChild(sheet);
    }

    sheet.textContent = css;
}

const port = browser.runtime.connect( {name: Date.now() + "" } );
port.onMessage.addListener(injectCSS);