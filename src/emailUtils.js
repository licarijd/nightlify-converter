const mailgun = require("mailgun-js");
const { DOMAIN, API_KEY, SENDER } = require("./mailgun.config");
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.
// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.

export const sendEmail = (to, imagePath) => {
    const data = {
        from: SENDER,
        to,
        subject: "Your Nightmode Image from Nightlify"
    }
    data.text = `Your mightmode friendly image can be found here: ${imagePath}. It will be available for the next 24 hours.`
    
    mg.messages().send(data, function (error, body) {
        if (error)
            console.log(error)
        console.log(body);
    });
}