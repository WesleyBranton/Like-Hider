# Facebook Like Hider [<img align="right" src=".github/fxaddon.png">](https://addons.mozilla.org/en-CA/firefox/addon/like-hider/)
Although it is a feature that many people have asked for, there is no way to stop likes and reactions on your posts and comments from displaying in your Facebook notifications. This browser extension does just that. De-clutter your notification window by getting rid of those pointless notifications about likes and reactions.

But why not take it a step further? A common theory is that social media can increase depression and can become addictive. This is due, in part, to the liking system used by social media platforms, which provides gratification that keeps you coming back.

This browser extension also can hide the likes and reactions counter from posts and comments. You can also disable the “Like” button from Facebook entirely.

## Development
This repository contains all of the required source code files to make changes to this extension. The "master" branch contains the source code for the latest stable release. If you want to test that version, you can view the release section to download the XPI file or visit the add-on listing on Mozilla.

If you want to make changes to this extension, you are welcome to do so. All files for the extension are located in the "firefox" folder. The source code of upcoming versions (if any) will be located in another branch.

To develop and test the extension, you need to open the "about:debugging" page in Firefox and select "Load Temporary Add-on". Then you can select any file within the "firefox" folder of this repository.

Further documentation about developing Firefox extensions can be found [here](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension).

## Release Notes
### Version 3.0
* **[NEW]** Added feature to increase the visibility of the label on "sponsored" posts
* **[NEW]** Add-on options can now be opened via a button in the address bar when on Facebook
* **[NEW]** Users are now prompted to configure settings on first installation
* **[FIXED]** Resolved issues with settings appearing broken on first install

### Version 2.2
* **[NEW]** Added support for new Facebook design
* **[FIXED]** Comment counter stays on right side when like counter is hidden

### Version 2.1.2
* **[NEW]** Added support for Facebook's onion address
* **[FIXED]** Resolved issue with options UI showing scrollbar

### Version 2.1.1
* **[FIXED]** Solved issue with all items being hidden

### Version 2.1
* **[NEW]** On-site popups for like notifications are hidden
* **[CHANGE]** Overhauled options UI

### Version 2.0
* **[FIXED]** Fixed issue when Facebook is loaded for the first time in a session
* **[FIXED]** Add-on has less of an impact on page loading speeds
* **[NEW]** Branding update
* **[NEW]** Note added to options menu advising to reload existing tabs
* **[CHANGED]** Add-on now uses dynamic content scripts instead of Javascript injection

### Version 1.3
* **[FIXED]** Add-on can hide like counters and buttons again

### Version 1.2
* **[FIXED]** Add-on no longer hides comment sorting option

### Version 1.1.1
* **[FIXED]** Add-on display name is now consistent with add-on listing

### Version 1.1
* **[FIXED]** Hidden UI elements should no longer momentarily display while page is loading
* **[FIXED]** Removed dot left behind by hidden like button (on comments)
* **[FIXED]** Removed spacing left behind by hidden like button (on posts)
* **[CHANGED]** Simplified options menu
