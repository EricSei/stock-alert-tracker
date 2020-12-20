exports.sendSMS = (_message) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: _message,
      from: "+12029987476",
      to: "+19179376894", //all numbers I want to send
    })
    .then((message) => console.log(message.sid));
};

// Test Numbers
// zawfinancialsolutions@gmail.com
// Zaw Tuseng sent Today at 8:35 PM
// info@zawfinance.com
// Zaw Tuseng sent Today at 8:35 PM
// 206 673 1797
// 720 400 5790
// 360 201 4051
// Zaw Tuseng sent Today at 8:35 PM
// 3478801674
// (917) 717 8346
// Zaw Tuseng sent Today at 8:35 PM
// 813 495 2212
// Zaw Tuseng sent Today at 8:35 PM
// 917 325 0965
