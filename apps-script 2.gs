/**
 * RSVP BACKEND — paste this whole file into script.google.com
 * (Extensions > Apps Script, from inside your Google Sheet)
 *
 * Every time a guest submits the RSVP form, this adds one row to
 * the Google Sheet it's bound to, so you can see who accepted,
 * how many were invited, and their message — all in one place.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add header row once, if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Guest", "Attending", "Invited Count", "Message"
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.guest || "",
    data.attending || "",
    data.invited || "",
    data.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
