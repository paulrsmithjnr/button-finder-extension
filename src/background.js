// Background script for the Button Finder extension
console.log('Button Finder Extension - Background Script loaded');

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Button Finder Extension installed');
}); 