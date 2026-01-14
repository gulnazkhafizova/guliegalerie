# Artist Portfolio Website

A modern, responsive artist portfolio website with integrated Google Sheets backend for managing orders, commissions, and contact forms.

## Features

- 🎨 Portfolio galleries organized by medium (Acrylic, Watercolor, Oil) and custom collections
- 🛒 Online store with shopping cart functionality
- 📧 Contact form with Google Sheets integration
- 🎯 Art commissions request system
- 💝 Support/donations tracking
- 📱 Fully responsive design for all devices
- 🔍 Instagram integration

## Technologies Used

- **Frontend**: Pure HTML5, CSS3, JavaScript (Vanilla JS - no frameworks)
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Styling**: Custom CSS with responsive design

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/gulnazkhafizova/artsite.git
cd artsite
```

### 2. Configure Your Personal Information

Replace all placeholder values with your actual information:

#### In `artsite.html`:
- Replace `your-email@example.com` with your email address (appears in 2 places)

#### In `script.js`:
- Replace `your-email@example.com` with your email address (appears in 5 error messages)
- Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Google Apps Script deployment URL (around line 395)

#### In `google-apps-script.js`:
- Replace `YOUR_SPREADSHEET_ID` with your Google Spreadsheet ID (line 16)

### 3. Set Up Google Sheets Backend

1. Create a new Google Spreadsheet
2. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[YOUR_SPREADSHEET_ID]/edit
   ```
3. Open **Extensions → Apps Script**
4. Delete the default code
5. Copy the entire contents of `google-apps-script.js` into the editor
6. Replace `YOUR_SPREADSHEET_ID` on line 16 with your actual Spreadsheet ID
7. Save the project (Ctrl+S / Cmd+S)
8. Click **Deploy → New deployment**
9. Select type: **Web application**
10. Set:
    - Execute as: **Me**
    - Who has access: **Anyone**
11. Click **Deploy**
12. Copy the web app URL
13. Paste this URL into `script.js` replacing `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`

### 4. Add Your Artwork

1. Place your artwork images in the `images/` folder
2. Update the `artworks` object in `script.js` with your artwork details
3. Update the HTML sections in `artsite.html` to reference your artwork IDs

### 5. Customize Content

- Update the About section with your biography
- Modify commission pricing and details
- Adjust store items and prices
- Update Instagram link in the header

## File Structure

```
artsite/
├── artsite.html              # Main HTML file
├── script.js                 # JavaScript functionality
├── styles.css                # Styling and responsive design
├── google-apps-script.js     # Backend script for Google Sheets
├── images/                   # Artwork images directory
├── .gitignore               # Git ignore file
├── README.md                # This file
├── ИНСТРУКЦИЯ_GOOGLE_SHEETS.md        # Russian: Google Sheets setup guide
└── ИНСТРУКЦИЯ_ОБНОВЛЕНИЕ_СКРИПТА.md   # Russian: Script update guide
```

## Google Sheets Structure

The backend automatically creates the following sheets:

### Contacts Sheet
| Date & Time | First Name | Last Name | Email | Message |
|-------------|------------|-----------|-------|---------|

### Orders Sheet
| Date & Time | Name | Email | Phone | Address | Order | Total |
|-------------|------|-------|-------|---------|-------|-------|

### Commissions Sheet
| Date & Time | Email |
|-------------|-------|

### Donations Sheet
| Date & Time | Name | Amount | Message |
|-------------|------|--------|---------|

## Security Notes

⚠️ **IMPORTANT**: Before deploying publicly:

1. Never commit your actual Google Spreadsheet ID to a public repository
2. Never commit your Google Apps Script URL to a public repository
3. Never commit your personal email to a public repository
4. Use the placeholder values provided in this template
5. Keep your actual configuration in a separate, private file

## Testing

1. Open `artsite.html` in a web browser
2. Test each form:
   - Contact form
   - Store checkout
   - Commission request
   - Support/donation
3. Verify data appears in your Google Spreadsheet

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is open source and available for personal and commercial use.

## Support

For questions or issues, please open an issue on GitHub or contact through the website's contact form.

## Credits

Built with ❤️ for artists by artists.

---

**Note**: This is a template. Remember to replace all placeholder values with your actual information before deployment!
