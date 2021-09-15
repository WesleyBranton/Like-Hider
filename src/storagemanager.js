/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const defaults = {
    hideNotification: true,
    hideLikeCounter: false,
    hideLikeButton: false
};

class StorageManager {

    /**
     * Create StorageManager instance
     * @param {Object} data Storage API data
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * Get setting from Storage API
     * @param {String} key 
     * @returns Setting or default value
     */
    getSetting(key) {
        if (typeof defaults[key] != 'undefined') {
            return (typeof this.data[key] == typeof defaults[key]) ? this.data[key] : defaults[key];
        } else {
            return this.data[key];
        }
        
    }

}