import nodemailer from 'nodemailer';

// Create a transporter object using Gmail SMTP server
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pratikkamejaliya6157@gmail.com', // your Gmail address
        pass: 'nebvdwmyfenensgb',         // App Password (not your Gmail password)
    },
});

// Function to send OTP via email
const sendotp = (to, otp) => {
    const mailOptions = {
        from: 'pratikkamejaliya6157@gmail.com',
        to: to,
        subject: 'Your OTP',
        text: `Your OTP is ${otp}`,
    };

    // Send the email
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending mail:', err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// Export the sendotp function
export default sendotp;
