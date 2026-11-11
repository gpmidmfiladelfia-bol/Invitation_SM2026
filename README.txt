CHRISTMAS INVITATION — WINNER GENERATION

1. Open index.html in a browser to preview.
2. Publish the whole folder on Netlify Drop / GitHub Pages (keep assets folder).
3. Page 1: click wax seal; Page 2: RSVP HERE -> Page 3; LOCATION DETAIL -> Google Maps.
4. IMPORTANT: Google Maps currently searches for 'GPMI-BOL Filadelfia'. Replace the map href in index.html with the exact Google Maps share URL for the venue.
5. IMPORTANT: RSVP form is PREVIEW ONLY until connected. To collect answers, deploy a Google Apps Script web app that accepts JSON POST and appends rows to a Google Sheet; then paste its deployment URL into RSVP_ENDPOINT in index.html. Confirm deployment permissions and test with real entries. Do not assume submissions are saved before this setup.
6. For best results, keep the image files as-is. This implementation uses your supplied 1080x1920 screenshots as exact visual backgrounds, with interactive elements overlaid. The responsive view preserves the portrait composition; on desktop it centers the mobile invitation.
