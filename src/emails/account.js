const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail= (email, name) => {
    sgMail.send({
        to:email,
        from: 'minhhoang132001@gmail.com',
        subject: 'Welcome to Task Manager',
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancelationEmail= (email, name) => {
    sgMail.send({
        to: email,
        from: 'minhhoang132001@gmail.com',
        subject: 'Account removed',
        text: `Hi ${name}, hope we can do more for you. Looking forward to see you onboard again.`,
    })
}

module.exports= {
    sendWelcomeEmail,
    sendCancelationEmail,
}