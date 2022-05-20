const nodeMailer = require('nodemailer');

const sendEmail = async (email, token) => {
    // Transporter
    let transporter = nodeMailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
   
    // Mail options 
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password reset link",
        html: `<div>Your verification code is ${token}. If you did not request to reset your password, please disregard this email</div>`
    }

    // Send email with defined transport object 
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Error! Email was not sent")
        } else {
            console.log('Email was successfully sent!')
        }
    })
}

module.exports = sendEmail;

