<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LiveArt Events - Masterpiece Experiences

LiveArt Events is a premium interactive entertainment company specializing in activity stalls, interactive games, and kids' entertainment for weddings, corporate events, and birthdays.

## ✨ Features
- **Occasion-Based Experiences**: Specialized sections for Weddings, Birthdays, and Corporate events.
- **Interactive Stations**: Catalog of high-end entertainment stations.
- **Multilingual Support**: English and Hindi support.
- **Enterprise SEO & AEO**: Fully optimized for Google and AI search engines (LLMs).
- **Google Sheets Integration**: Real-time lead capturing from inquiry forms.

## 🚀 Deployment

The site is built with **React + Vite** and deployed on **Vercel**.

### Google Sheets Integration
The contact and partner forms are connected directly to a Google Sheet via a Google Apps Script webhook.
For setup instructions, see: [Google Sheets Setup Guide](./Google_Sheets_Setup_Guide.md)

### Environment Variables
To ensure the forms work in production, set the following in your Vercel Dashboard:
- `VITE_GOOGLE_SHEETS_URL`: The URL of your deployed Google Apps Script web app.

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Setup environment**:
   Create a `.env` file based on `.env.example`.
3. **Run the app**:
   ```bash
   npm run dev
   ```

