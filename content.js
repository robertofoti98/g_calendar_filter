// This selector targets the event containers in Google Calendar
const EVENT_SELECTOR = '[role="button"][data-eventid]';

function applyFilter(term) {
	const events = document.querySelectorAll(EVENT_SELECTOR);

	events.forEach((event) => {
		const text = event.innerText.toLowerCase();
		if (!term || term === "") {
			// Reset if no term is provided
			event.style.opacity = "1";
			event.style.transition = "opacity 0.3s ease";
		} else if (text.includes(term)) {
			// Match found
			event.style.opacity = "1";
		} else {
			// No match - apply opacity
			event.style.opacity = "0.2";
			event.style.transition = "opacity 0.3s ease";
		}
	});
}

// Watch for changes (scrolling, switching weeks)
const observer = new MutationObserver(() => {
	chrome.storage.sync.get(["searchTerm"], (data) => {
		applyFilter(data.searchTerm || "");
	});
});

observer.observe(document.body, { childList: true, subtree: true });

// Listen for manual updates from the popup
chrome.runtime.onMessage.addListener((request) => {
	if (request.action === "filter") {
		applyFilter(request.term);
	}
});
