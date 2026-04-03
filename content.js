// --- 1. FILTER LOGIC ---
const EVENT_SELECTOR = '[role="button"][data-eventid]';

function applyFilter(term) {
	const events = document.querySelectorAll(EVENT_SELECTOR);
	const lowerTerm = term ? term.toLowerCase() : "";

	events.forEach((event) => {
		const text = event.innerText.toLowerCase();
		if (!lowerTerm || lowerTerm === "") {
			event.style.opacity = "1";
		} else if (text.includes(lowerTerm)) {
			event.style.opacity = "1";
		} else {
			event.style.opacity = "0.2";
		}
		event.style.transition = "opacity 0.3s ease";
	});
}

// --- 2. OBSERVER (For scrolling/view changes) ---
const observer = new MutationObserver(() => {
	if (chrome.runtime?.id) {
		chrome.storage.sync.get(["searchTerm"], (data) => {
			if (chrome.runtime.lastError) return;
			applyFilter(data.searchTerm || "");
		});
	}
});
observer.observe(document.body, { childList: true, subtree: true });

// --- 3. UI INJECTION ---
(function () {
	if (document.getElementById("ext-root")) return;

	const layout = {
		styles: `
        #ext-root {
            position: fixed;
            top: 15px; 
            right: 80px; 
            z-index: 10000;
            width: 260px;
            font-family: "Google Sans", Roboto, sans-serif;
            display: none !important; 
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .card {
            background: white;
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border: 1px solid #e0e0e0;
            position: relative;
        }

        h3 { margin: 0 0 12px 0; color: #202124; font-size: 15px; font-weight: 500; }

        input {
            width: 100%;
            padding: 10px 12px;
            margin-bottom: 12px;
            box-sizing: border-box;
            border: 1px solid #dadce0;
            border-radius: 8px;
            outline: none;
            font-size: 13px;
        }

        .action-container { display: flex; gap: 8px; }

        button.action-btn {
            flex: 1; padding: 8px; cursor: pointer; font-weight: 600;
            border: none; border-radius: 8px; font-size: 13px;
        }

        #filterBtn { background: #4285f4; color: white; }
        #resetBtn { background: #f1f3f4; color: #3c4043; }
        `,
		template: `
        <div id="ext-root">
            <div class="card">
                <h3>Filter Events</h3>
                <input type="text" id="ext-keyword" placeholder="Filter..." />
                <div class="action-container">
                    <button id="filterBtn" class="action-btn">Apply</button>
                    <button id="resetBtn" class="action-btn">Clear</button>
                </div>
            </div>
        </div>
        `,
	};

	const styleSheet = document.createElement("style");
	styleSheet.textContent = layout.styles;
	document.head.appendChild(styleSheet);
	document.body.insertAdjacentHTML("beforeend", layout.template);

	const root = document.getElementById("ext-root");
	const input = document.getElementById("ext-keyword");
	const filterBtn = document.getElementById("filterBtn");
	const resetBtn = document.getElementById("resetBtn");

	// This listens for when you click the extension icon in the toolbar
	chrome.runtime.onMessage.addListener((request) => {
		if (request.action === "toggle_popup") {
			const isHidden = window.getComputedStyle(root).display === "none";
			if (isHidden) {
				root.style.setProperty("display", "block", "important");
				input.focus();
			} else {
				root.style.setProperty("display", "none", "important");
			}
		}
	});

	document.addEventListener("mousedown", (event) => {
		if (window.getComputedStyle(root).display === "block" && !root.contains(event.target)) {
			root.style.setProperty("display", "none", "important");
		}
	});

	// Load saved term
	chrome.storage.sync.get(["searchTerm"], (data) => {
		if (data.searchTerm) {
			input.value = data.searchTerm;
			applyFilter(data.searchTerm);
		}
	});

	filterBtn.addEventListener("click", () => {
		chrome.storage.sync.set({ searchTerm: input.value }, () => {
			applyFilter(input.value);
		});
	});

	resetBtn.addEventListener("click", () => {
		input.value = "";
		chrome.storage.sync.set({ searchTerm: "" }, () => {
			applyFilter("");
		});
	});

	input.addEventListener("keypress", (e) => {
		if (e.key === "Enter") filterBtn.click();
	});
})();
