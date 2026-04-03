# 📅 Google Calendar Event Filter Pro

A sleek, lightweight Chrome Extension that allows you to filter your Google Calendar events in real-time. Unlike standard extensions that use rigid browser popups, this version uses an **Injected UI** to provide a seamless, modern experience with native-feeling interactions and 100% design control.

---

## ✨ Features

- **Real-time Filtering:** Hide or fade out events that don't match your keyword instantly.
- **Persistent State:** Remembers your last filtered keyword even after closing the browser or refreshing the page using `chrome.storage`.
- **Modern Design:** A custom-built, floating card with **16px rounded corners**, soft shadows, and clean typography that bypasses the "ugly" default Chrome extension box.
- **Smart Toggle:** Open the filter by clicking the extension icon in your toolbar; close it instantly by clicking anywhere else on the calendar.
- **Dynamic Observation:** Uses a `MutationObserver` to automatically re-apply filters when you change weeks, months, or navigate the calendar.

---

## 🛠 Installation

1.  **Download/Clone** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** using the toggle in the top right corner.
4.  Click **Load unpacked** and select the folder containing these project files.
5.  **Important:** Pin the extension to your toolbar by clicking the puzzle piece icon 🧩 next to your profile picture.
6.  **Refresh** your Google Calendar tab to initialize the script.

---

## 📂 Project Structure

```text
├── manifest.json      # Extension configuration, permissions, and service worker setup
├── background.js      # Service worker that handles the toolbar icon click events
└── content.js         # The "Core" - handles UI injection, event filtering, and DOM observation
```
