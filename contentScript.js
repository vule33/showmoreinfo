let filterEnabled = true;
let selectedCountry = 'RS';

chrome.storage.local.get(['filterEnabled', 'selectedCountry'], (result) => {
  filterEnabled = result.filterEnabled ?? true;
  selectedCountry = result.selectedCountry ?? 'RS';
  observeDOMChanges();
});

function filterRow(row) {
  const flagCell = row.querySelector(`div.flag.${selectedCountry}.ng-star-inserted`);

  if (filterEnabled) {
    if (flagCell) {
      row.style.display = 'table-row';
    } else {
      row.remove();
    }
  } else {
    row.style.display = 'table-row';
  }
}

function observeDOMChanges() {
  const targetNode = document.querySelector('body');
  const config = { attributes: true, childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.tagName === 'TR' && addedNode.classList.contains('ng-star-inserted')) {
            filterRow(addedNode);
          }
        }
      }
    }
  });

  observer.observe(targetNode, config);

  document.querySelectorAll('tr.ng-star-inserted').forEach(filterRow);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateCountry') {
    selectedCountry = request.country;
    chrome.storage.local.set({ selectedCountry: selectedCountry });
    location.reload();
  }

});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleFilter') {
    filterEnabled = request.status;
    chrome.storage.local.set({ filterEnabled: filterEnabled });
    location.reload();
  } else if (request.action === 'getFilterStatus') {
    sendResponse({ status: filterEnabled });
  }
});
