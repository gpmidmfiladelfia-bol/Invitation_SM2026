// Google Sheets > Extensions > Apps Script. Paste this code and deploy as Web App.
// Execute as: Me; Who has access: Anyone.
const SPREADSHEET_ID = '1_9B312mlEoRrKTjLmglMAAw2-TyJ62v-AJbkzz88r3I';
const SHEET_NAME = 'RSVP Natal 2026';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const name = String(data.name || '').trim();
    const attendance = String(data.attendance || '');
    const friends = String(data.friends || '');
    const rating = Number(data.rating);
    const guests = Number(data.guestCount || 0);
    if (!name || name.length > 100 || !['Pastinya dateng!', 'Sorry :('].includes(attendance) ||
        !['Iya, ada teman', 'Aku sendiri'].includes(friends) || !Number.isInteger(rating) || rating < 1 || rating > 5 ||
        !Number.isInteger(guests) || guests < 0 || guests > 99 || (friends === 'Iya, ada teman' && guests < 1)) {
      return ContentService.createTextOutput(JSON.stringify({ok:false,error:'Invalid RSVP'})).setMimeType(ContentService.MimeType.JSON);
    }
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Waktu Submit', 'Nama + Panggilan', 'Kehadiran', 'Bawa Teman?', 'Jumlah Teman', 'Total Orang', 'Excitement (1-5)']);
      sheet.setFrozenRows(1);
    }
    // Prevent spreadsheet formula injection in free text fields.
    const safeName = /^[=+@\-]/.test(name) ? "'" + name : name;
    sheet.appendRow([new Date(), safeName, attendance, friends, friends === 'Iya, ada teman' ? guests : 0, 1 + (friends === 'Iya, ada teman' ? guests : 0), rating]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  } finally { lock.releaseLock(); }
}
