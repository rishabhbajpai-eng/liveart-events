/**
 * Unified form submission handler for Google Sheets integration.
 * Handles honeypot checks, payload preparation, and fetch with no-cors.
 */

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export const submitToGoogleSheets = async (payload, botField) => {
  // 1. Honeypot check
  if (botField) {
    console.warn("Bot detected via honeypot.");
    return { success: true, bot: true }; // Silently "succeed" for bots
  }

  // 2. Validate URL
  if (!GOOGLE_SHEETS_URL) {
    console.error("VITE_GOOGLE_SHEETS_URL is not defined in environment variables.");
    // In production, we don't want to break the UI, but we should know it failed.
    throw new Error("Configuration Error: Submission endpoint missing.");
  }

  // 3. Submit data
  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: window.location.href
      }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      mode: 'no-cors' // Required for Google Apps Script redirects
    });

    // Note: With mode 'no-cors', we can't check response.ok or response.status.
    // If fetch didn't throw, we assume it was sent.
    return { success: true };
  } catch (error) {
    console.error("Form submission failed:", error);
    return { success: false, error: error.message };
  }
};
