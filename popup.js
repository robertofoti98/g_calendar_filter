const keywordInput = document.getElementById("keyword");

// Helper to send messages to content script
const sendMessageToContentScript = (message) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]) {
			chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
				if (chrome.runtime.lastError) {
					const errMsg = chrome.runtime.lastError.message;
					if (errMsg.includes("context invalidated")) {
						console.warn("Extension updated! Please refresh the Google Calendar page to continue.");
					} else {
						console.warn("Could not connect:", errMsg);
					}
				}
			});
		}
	});
};

// Function to trigger the filtering
const triggerFilter = () => {
	const keyword = keywordInput.value.toLowerCase();
	chrome.storage.sync.set({ searchTerm: keyword }, () => {
		sendMessageToContentScript({ action: "filter", term: keyword });
	});
};

// Listen for the "Enter" key
keywordInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		triggerFilter();
	}
});

// Click listener for the Filter button
document.getElementById("filterBtn").addEventListener("click", triggerFilter);

// Click listener for the Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
	keywordInput.value = "";
	chrome.storage.sync.set({ searchTerm: "" }, () => {
		sendMessageToContentScript({ action: "filter", term: "" });
	});
});
