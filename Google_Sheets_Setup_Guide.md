# Google Sheets Integration Setup Guide

Follow these steps exactly to connect your website forms to your Google Sheet:

## Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name the spreadsheet (e.g., `LiveArt Events Leads`).
3. Make sure the first tab is named exactly `Sheet1`.
4. Create the following headers in Row 1 (A to J):
   `Timestamp` | `Name` | `Phone` | `Email` | `EventType` | `EventDate` | `City` | `Budget` | `Message` | `Source URL`

## Step 2: Add the Apps Script Code
1. In your Google Sheet menu, click **Extensions > Apps Script**.
2. Delete any existing code in `Code.gs` and paste the following exactly:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.email,
    data.eventType,
    data.eventDate,
    data.city,
    data.budget,
    data.message,
    data.source || "Unknown"
  ]);

  // Send email notification to liveartpartyevents@gmail.com
  const emailTo = "liveartpartyevents@gmail.com";
  const subject = `New Inquiry from ${data.name || "User"}`;
  let body = `You have received a new inquiry:\n\n`;
  body += `Name: ${data.name}\n`;
  body += `Phone: ${data.phone}\n`;
  body += `Email: ${data.email}\n`;
  body += `Event Type: ${data.eventType}\n`;
  body += `Event Date: ${data.eventDate}\n`;
  body += `City: ${data.city}\n`;
  body += `Budget: ${data.budget}\n`;
  body += `Message: ${data.message}\n`;
  body += `Source: ${data.source || "Unknown"}\n`;
  body += `\nTimestamp: ${new Date()}`;

  try {
    MailApp.sendEmail(emailTo, subject, body);
  } catch (err) {}

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true
    }))
    .setMimeType(ContentService.MimeType.JSON);
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
