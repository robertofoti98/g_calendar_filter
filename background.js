chrome.action.onClicked.addListener((tab) => {
	if (tab.url && tab.url.includes("calendar.google.com")) {
		chrome.tabs.sendMessage(tab.id, { action: "toggle_popup" }).catch((err) => {
			console.log("Content script not loaded yet. Try refreshing the page.");
		});
	}
});
