/**
 * Production-ready form submission handler for LiveArt Events.
 * Integrates Google Sheets storage and WhatsApp redirection.
 */

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
const WHATSAPP_NUMBER = '918853299951';

export const submitToGoogleSheets = async (formData, botField) => {
  // 1. Bot Protection (Honeypot)
  if (botField) {
    console.warn("Spam detected via honeypot.");
    return { success: true, bot: true }; // Silently succeed
  }

  // 2. Validate Endpoint
  if (!GOOGLE_SHEETS_URL) {
    console.error("VITE_GOOGLE_SHEETS_URL missing. Forms will fail.");
    return { success: false, error: "Configuration Error" };
  }

  try {
    // 3. Prepare Payload for Google Sheets
    const payload = {
      ...formData,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      source: window.location.href,
      userAgent: navigator.userAgent
    };

    // 4. Submit to Google Sheets (POST)
    // Note: mode 'no-cors' is used because Apps Script redirects cause CORS issues
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      mode: 'no-cors'
    });

    // 5. Generate WhatsApp Message
    const message = `Hello LiveArt Events,\nI want inquiry for an event.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEvent Type: ${formData.eventType}\nEvent Date: ${formData.eventDate}\nGuest Count: ${formData.guestCount}\nBudget: ${formData.budget}\n\nAdditional Message:\n${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return { 
      success: true, 
      whatsappUrl 
    };

  } catch (error) {
    console.error("Submission error:", error);
    return { 
      success: false, 
      error: error.message || "An unexpected error occurred." 
    };
  }
};
