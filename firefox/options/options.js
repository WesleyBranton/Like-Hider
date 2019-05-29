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

browser.storage.local.get("setting", restoreOptions);
document.querySelector("form").addEventListener("change", saveOptions);