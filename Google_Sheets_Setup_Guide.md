# Google Sheets Integration Setup Guide

Follow these steps exactly to connect your website forms to your Google Sheet:

## Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name the spreadsheet (e.g., `LiveArt Events Leads & Partners`).
3. Create two tabs (Sheets) at the bottom:
   - Name the first sheet exactly: `Leads`
   - Name the second sheet exactly: `Partners`
4. In the `Leads` sheet, create the following headers in Row 1 (A to I):
   `Timestamp` | `Form` | `Name` | `Email` | `Phone` | `Date` | `Location` | `EventSize` | `Message` | `Source`
5. In the `Partners` sheet, create the following headers in Row 1 (A to I):
   `Timestamp` | `Form` | `Name` | `Email` | `Phone` | `Agency` | `Website` | `Instagram` | `Experience` | `Source`

## Step 2: Add the Apps Script Code
1. In your Google Sheet menu, click **Extensions > Apps Script**.
2. Delete any existing code in `Code.gs` and paste the following exactly:

```javascript
const LEADS_SHEET_NAME = "Leads";
const PARTNERS_SHEET_NAME = "Partners";

function doPost(e) {
  try {
    // Basic CORS headers
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // If no parameters, return error
    if (!e || !e.parameter) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No parameters provided"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const formType = e.parameter.formType;
    let sheetName = "";
    
    if (formType === "LeadForm") {
      sheetName = LEADS_SHEET_NAME;
    } else if (formType === "PartnerForm") {
      sheetName = PARTNERS_SHEET_NAME;
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Unknown form type"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(sheetName);
    
    // Fallback to active sheet if name doesn't exist
    if (!sheet) {
      sheet = doc.getActiveSheet();
    }

    const headersRange = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = [];

    // Map parameters to columns
    for (let i = 0; i < headersRange.length; i++) {
      const header = headersRange[i].toString().trim();
      if (header === "Timestamp") {
        newRow.push(new Date());
      } else if (header === "Form") {
        newRow.push(formType);
      } else if (header === "Source") {
         newRow.push(e.parameter.sourceUrl || "Direct");
      } else {
        // Find corresponding parameter (case insensitive matching)
        let paramValue = "";
        for (let param in e.parameter) {
          if (param.toLowerCase() === header.toLowerCase()) {
            paramValue = e.parameter[param];
            break;
          }
        }
        newRow.push(paramValue);
      }
    }

    // Insert row atomically
    const lock = LockService.getScriptLock();
    lock.waitLock(30000); // wait 30 seconds before conceding defeat.
    try {
      sheet.appendRow(newRow);
    } finally {
      lock.releaseLock();
    }

    // Send email notification
    const emailTo = "liveartpartyevents@gmail.com";
    const subject = `New Inquiry: ${formType} from ${e.parameter.name || "User"}`;
    let body = `You have received a new inquiry from the ${formType}:\n\n`;
    
    for (let param in e.parameter) {
      if (param !== "formType" && param !== "sourceUrl" && param !== "botField") {
        body += `${param}: ${e.parameter[param]}\n`;
      }
    }
    body += `\nSource URL: ${e.parameter.sourceUrl || "Direct"}\nTimestamp: ${new Date()}`;
    
    try {
      MailApp.sendEmail(emailTo, subject, body);
    } catch (mailError) {
      // Ignore mail error to not fail the webhook
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row added successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    });
}
```

## Step 3: Deploy as Web App
1. Click the **Deploy** button at the top right, then select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the following:
   - **Description**: Website Forms
   - **Execute as**: `Me` (Your Google Account)
   - **Who has access**: `Anyone` (This is critical, otherwise the website cannot send data).
4. Click **Deploy**.
5. Google will prompt you to authorize access. Click **Authorize access**, select your account, click **Advanced**, and click **Go to [Project Name] (unsafe)**. Then click **Allow**.
6. **Copy the Web app URL** provided.

## Step 4: Add the URL to Vercel
1. Go to your Vercel Project Dashboard.
2. Click **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_GOOGLE_SHEETS_URL`
   - **Value**: `[Paste your Web app URL here]`
4. Click **Save** and **Redeploy** your Vercel project.
