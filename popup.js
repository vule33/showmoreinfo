function setActiveButton(status) {
  document.getElementById('onButton').classList.toggle('inactive', !status);
  document.getElementById('offButton').classList.toggle('inactive', status);
}

// Update the country dropdown based on the stored value
function updateCountryDropdown(countryCode) {
  document.getElementById('countrySelect').value = countryCode;
}

document.getElementById('onButton').addEventListener('click', () => {
  setActiveButton(true);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleFilter', status: true }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
  });
  chrome.storage.local.set({ filterEnabled: true });
  chrome.tabs.reload();
});

document.getElementById('offButton').addEventListener('click', () => {
  setActiveButton(false);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleFilter', status: false }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
    });
  });
  chrome.storage.local.set({ filterEnabled: false });
  chrome.tabs.reload();
});

document.getElementById('countrySelect').addEventListener('change', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'updateCountry', country: this.value }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      }
      window.close(); 
    });
  });
  chrome.storage.local.set({ selectedCountry: this.value });
  chrome.tabs.reload();
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'getFilterStatus' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else {
      setActiveButton(response.status);
    }
  });
});

chrome.storage.local.get(['selectedCountry'], (result) => {
  const selectedCountry = result.selectedCountry ?? '';
  updateCountryDropdown(selectedCountry);
});
