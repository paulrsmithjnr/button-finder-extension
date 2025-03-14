import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements AfterViewInit {
  
  constructor(private el: ElementRef) {}
  
  ngAfterViewInit(): void {
    const button = this.el.nativeElement.querySelector('.find-button');
    if (button) {
      button.addEventListener('click', () => {
        this.findButtons();
      });
    }
  }
  
  findButtons(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabId = tabs[0].id;
      if (currentTabId) {
        chrome.tabs.sendMessage(currentTabId, { action: 'findButtons' });
      }
    });
  }
} 