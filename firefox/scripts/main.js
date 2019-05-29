function createCSS(rule) {
	var css = document.createElement('style');
	css.type = 'text/css';
	css.appendChild(document.createTextNode(rule));
	document.getElementsByTagName('head')[0].appendChild(css);
}

function load(item) {
	var rule = '';
	if (item.setting.hideNotification) {
		rule = '._33c[data-gt*="feedback_reaction_generic"]';
	}
	if (item.setting.hideLikeCounter) {
		if (rule != '') {
			rule += ', ';
		}
		rule += '._66lg, ._6cuq';
	}
	if (item.setting.hideLikeButton) {
		if (rule != '') {
			rule += ', ';
		}
		rule += 'li._6coj:first-of-type, li._6coj:nth-of-type(2) ._6cok, ._18vi:first-of-type';
	}
	rule += ' { display:none !important;}';
	createCSS(rule);
}

browser.storage.local.get("setting", load);