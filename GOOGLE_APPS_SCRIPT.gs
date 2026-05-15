/**
 * Google Apps Script for LiveArt Events Inquiry Form
 * 
 * Instructions:
 * 1. Open Google Sheets.
 * 2. Go to Extensions -> Apps Script.
 * 3. Delete existing code and paste this.
 * 4. Update the CONFIG section if needed.
 * 5. Deploy as Web App (Execute as: Me, Who has access: Anyone).
 * 6. Copy the Web App URL and set it as VITE_GOOGLE_SHEETS_URL in your .env file.
 */

const CONFIG = {
  spreadsheetId: '', // Leave empty to use the active sheet
  sheetName: 'Sheet1' // Ensure this matches your sheet name
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = CONFIG.spreadsheetId ? SpreadsheetApp.openById(CONFIG.spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.sheetName) || ss.getSheets()[0];
    
    // Headers setup if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 
        'Name', 
        'Phone', 
        'Email', 
        'Event Type', 
        'Event Date', 
        'Guest Count', 
        'Budget', 
        'City', 
        'Message', 
        'Source'
      ]);
      // Styling
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#f3f4f6');
    }
    
    // Append the row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.phone,
      data.email,
      data.eventType,
      data.eventDate,
      data.guestCount,
      data.budget,
      data.city,
      data.message,
      data.source || 'Direct'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Inquiry stored successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET for testing
function doGet(e) {
  return ContentService.createTextOutput('Backend is alive! Use POST for submissions.').setMimeType(ContentService.MimeType.TEXT);
}
