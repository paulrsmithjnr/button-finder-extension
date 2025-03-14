import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div id="app-container"></div>`,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Button Finder Extension';
  statusMessage: string = '';
  statusElement: HTMLDivElement | null = null;

  ngOnInit() {
    // Create container
    const container = document.createElement('div');
    container.className = 'popup-container';
    
    // Create header
    const header = document.createElement('h1');
    header.textContent = 'Button Finder';
    
    // Create button
    const button = document.createElement('button');
    button.className = 'find-button';
    button.textContent = 'Click me to find buttons';
    
    // Add click handler with correct binding
    button.addEventListener('click', () => this.findButtons());
    
    // Create status message element
    this.statusElement = document.createElement('div');
    this.statusElement.className = 'status-message';
    
    // Assemble DOM
    container.appendChild(header);
    container.appendChild(button);
    container.appendChild(this.statusElement);
    
    // Add to app container
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
      appContainer.appendChild(container);
    }
  }

  // Update the status message
  updateStatus(message: string) {
    this.statusMessage = message;
    if (this.statusElement) {
      this.statusElement.textContent = message;
    }
  }

  findButtons() {
    this.updateStatus('Looking for buttons...');
    
    // Send message to content script to find buttons
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      
      if (!currentTab) {
        this.updateStatus('Error: No active tab found');
        return;
      }
      
      const currentTabId = currentTab.id;
      if (!currentTabId) {
        this.updateStatus('Error: Tab ID not available');
        return;
      }
      
      // Check if we can access this tab
      const url = currentTab.url || '';
      if (url.startsWith('chrome://') || url.startsWith('chrome-extension://') || url === 'about:blank' || url === '') {
        this.updateStatus('Cannot find buttons on this page type (chrome:// or extension pages)');
        return;
      }
      
      // First try to inject the content script programmatically
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTabId },
          files: ['content-script.js']
        },
        () => {
          // Now send the message after ensuring the content script is loaded
          chrome.tabs.sendMessage(
            currentTabId, 
            { action: 'findButtons' },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                this.updateStatus('Error: ' + (chrome.runtime.lastError.message || 'Could not communicate with page'));
              } else if (response && response.success) {
                this.updateStatus('Found buttons: ' + (response.count || 0));
              }
            }
          );
        }
      );
    });
  }
} 