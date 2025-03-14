import { Component } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  
  findButtons(): void {
    // Send message to content script to find buttons
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabId = tabs[0].id;
      if (currentTabId) {
        chrome.tabs.sendMessage(currentTabId, { action: 'findButtons' });
      }
    });
  }
} 