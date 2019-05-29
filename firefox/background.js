function handleInstalled(details) {
	if (details.reason == 'install') {
		browser.storage.local.set({
			setting: {
				hideNotification: true,
				hideLikeCounter: false,
				hideLikeButton: false
			}
		});
	}
}

browser.runtime.onInstalled.addListener(handleInstalled);