Country-Specific Content Filter for CSGOFloat.com


This browser extension allows users to filter content on CSGOFloat.com based on the country of origin. 
By selecting a specific country in the extension's dropdown menu, users can view content only from that country on CSGOFloat.com.

Limitation
The extension faces a limitation in its current implementation due to the way it loads content. 
CSGOFloat.com often has a limit on the number of items it loads at once (e.g., 200 items). 
If, for example, a user selects a country with only five items within the first 200 loaded items, 
the extension will display those five items, and the user will need to scroll down to load the next 200 items containing content from the selected country.

In other words, the extension can only filter the content that has already been loaded by CSGOFloat.com.
 If the website has a limit on the number of items it loads at once, the extension will be subject to the same limitation.

Additional Notes
The code may contain runtime errors, which could affect the extension's functionality.
The code is not well-commented, which might make it confusing for those who are trying to understand or modify the code.
The longer list of countries will be implemented, the existing countries were just for testing.