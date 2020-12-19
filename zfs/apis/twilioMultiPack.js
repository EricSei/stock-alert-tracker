exports.sendStockPicks = (_message, numbers) => {
  const twilio = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const body = _message;
  // const numbers = [process.env.MY_NUMBER];
  //get this number from MongoDb
  // const numbers = ["+19179376894"];
  Promise.all(
    numbers.map((number) => {
      return twilio.messages.create({
        to: number,
        from: process.env.TWILIO_MESSAGING_SERVICE_SID,
        body: body,
      });
    })
  )
    .then((messages) => {
      console.log("Stock Picks Messages sent!");
    })
    .catch((err) => console.error(err));
};
