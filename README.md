# Button Finder Chrome Extension

A Chrome extension built with Angular that finds buttons on web pages and displays tooltips over them.

## Features

- Finds buttons on any web page
- Displays "This is a button!" tooltip over each button
- Simple popup UI with a single button to trigger the button finding

## Project Structure

- `src/app` - Angular application
- `src/content-script.js` - Script injected into web pages to find buttons
- `src/background.js` - Background service worker
- `manifest.json` - Chrome extension manifest

## Development Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the extension:

```bash
npm run build
```

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top-right corner
3. Click "Load unpacked" and select the `dist/button-finder-extension` directory
4. The Button Finder extension should now be installed and visible in your extensions list

## Usage

1. Click on the Button Finder extension icon in the Chrome toolbar
2. In the popup, click the "Click me to find buttons" button
3. The extension will scan the current page for buttons and display tooltips over each one it finds

## Technologies Used

- Angular 17
- TypeScript
- Chrome Extension API

## License

ISC 