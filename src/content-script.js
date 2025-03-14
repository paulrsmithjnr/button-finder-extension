// Content script to find buttons and add tooltips
let tooltips = [];

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'findButtons') {
    removeExistingTooltips();
    findAndHighlightButtons();
  }
});

// Function to remove any existing tooltips
function removeExistingTooltips() {
  tooltips.forEach(tooltip => {
    if (tooltip && tooltip.parentNode) {
      tooltip.parentNode.removeChild(tooltip);
    }
  });
  tooltips = [];
}

// Function to find all buttons and add tooltips
function findAndHighlightButtons() {
  // Find all button elements and elements with role="button"
  const buttonElements = [
    ...document.querySelectorAll('button'),
    ...document.querySelectorAll('[role="button"]'),
    ...document.querySelectorAll('input[type="button"]'),
    ...document.querySelectorAll('input[type="submit"]'),
    ...document.querySelectorAll('a.btn'),
    ...document.querySelectorAll('.button')
  ];

  // Create unique set of buttons (no duplicates)
  const uniqueButtons = [...new Set(buttonElements)];

  // Add tooltip for each button
  uniqueButtons.forEach(button => {
    const rect = button.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) { // Only visible buttons
      const tooltip = createTooltip(button);
      tooltips.push(tooltip);
    }
  });
}

// Function to create tooltip for a button
function createTooltip(button) {
  const rect = button.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const tooltip = document.createElement('div');
  tooltip.textContent = 'This is a button!';
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '10000';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px 10px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.fontSize = '14px';
  tooltip.style.pointerEvents = 'none'; // Make tooltip non-interactive
  tooltip.style.left = `${rect.left + scrollLeft}px`;
  tooltip.style.top = `${rect.top + scrollTop - 30}px`; // Position above the button
  
  // Add arrow pointing to the button
  tooltip.style.setProperty('--arrow-size', '6px');
  tooltip.style.setProperty('--tooltip-color', 'rgba(0, 0, 0, 0.8)');
  tooltip.style.setProperty('--tooltip-arrow', `
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: calc(var(--arrow-size) * -1);
    border-width: var(--arrow-size);
    border-style: solid;
    border-color: var(--tooltip-color) transparent transparent transparent;
  `);
  
  // Add arrow using pseudo-element
  tooltip.style.setProperty('--arrow', 'true');
  tooltip.setAttribute('data-arrow', 'true');
  
  // Add CSS for arrow
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    [data-arrow="true"]::after {
      ${tooltip.style.getPropertyValue('--tooltip-arrow')}
    }
  `;
  document.head.appendChild(styleElement);
  
  document.body.appendChild(tooltip);
  return tooltip;
} 