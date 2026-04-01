# 📅 Google Calendar Event Filter

A lightweight Chrome Extension that allows you to visually filter your Google Calendar events by keyword. Matching events stay solid, while others fade into the background, helping you focus on what matters.

## ✨ Features
* **Instant Filtering:** Type a keyword and hit **Enter** or click **Apply**.
* **Visual Focus:** Uses opacity to de-emphasize non-matching events without hiding them completely.
* **Dynamic Updates:** Works seamlessly when you switch between Week, Month, or Day views.
* **Persistent State:** Remembers your filter even if you navigate between different dates.

---

## 🛠 Installation (Developer Mode)

Since this extension is not on the Chrome Web Store, you’ll load it locally:

1.  **Create a folder** on your computer (e.g., `CalendarFilter`).
2.  **Save the files:** Place `manifest.json`, `popup.html`, `popup.js`, and `content.js` inside that folder.
3.  Open Google Chrome and navigate to `chrome://extensions/`.
4.  In the top-right corner, toggle **Developer mode** to **ON**.
5.  Click the **Load unpacked** button.
6.  Select your `CalendarFilter` folder.
7.  **Refresh** your Google Calendar tab if it was already open.

---

## 🚀 How to Use

1.  Click the **Extension icon** (puzzle piece 🧩) in your Chrome toolbar and pin **Calendar Event Filter**.
2.  Open the popup.
3.  Enter a keyword (e.g., "Meeting", "Deep Work", "Personal").
4.  Press **Enter** or click **Apply Filter**.
5.  To see all events again, click **Clear Filter**.

---

## 📂 File Structure

* `manifest.json`: Defines permissions and tells Chrome where the scripts are.
* `content.js`: The logic that interacts with the Google Calendar page to change event styles.
* `popup.html / popup.js`: The user interface and communication logic.

---

## ⚠️ Troubleshooting

* **"Content script not ready":** This happens if the extension was just installed/reloaded. Simply **refresh** your Google Calendar tab.
* **"Extension context invalidated":** This occurs after you update the extension code. Refresh the Google Calendar page to re-sync the connection.
* **Events not fading:** Google occasionally updates their internal code. If filtering stops working, the `EVENT_SELECTOR` in `content.js` may need to be updated to match the latest Google Calendar structure.
