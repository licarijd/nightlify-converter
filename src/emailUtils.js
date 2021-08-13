const mailgun = require("mailgun-js");
const mailcomposer = require('mailcomposer');
const { SANDBOX_DOMAIN, API_KEY, SANDBOX } = require("./mailgun.config");
const DOMAIN = 	'mg.nightlify.net'
const SENDER = 'Nightlify'
const mg = mailgun({apiKey: API_KEY, domain: process.env.NODE_ENV == 'production' ? DOMAIN : SANDBOX_DOMAIN});

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.
// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.

export const sendEmail = (to, imagePath) => {
    const mail = mailcomposer({
        from: process.env.NODE_ENV == 'production' ? SENDER : SANDBOX,
        to,
        subject: 'Your Nightmode Image from Nightlify',
        body: `Your mightmode friendly image can be found here: ${imagePath} It will be available for the next 24 hours.`,
        html: `
            <div>
                <p>Your mightmode friendly image can be found here: </p>
                <a style="color: #4011ed; cursor: pointer;" href="${imagePath}">${imagePath}</a>
                <p>It will be available for the next 24 hours.</p>
            </div>`
      })
    
      mail.build(function(mailBuildError, message) {
        if (mailBuildError) {
            console.log(mailBuildError)
            return
        }

        const data = {
            to,
            message: message.toString('ascii')
        };
    
        mg.messages().sendMime(data, function (sendError, body) {
            if (sendError) {
                console.log(sendError);
                return;
            }
            console.log(body)
        });
    });
}