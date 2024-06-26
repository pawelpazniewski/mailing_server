import nodemailer from 'nodemailer';
import 'dotenv/config';
import { connectToMariaDB } from './dbconnect.js';

const creds = {
    user: process.env.USER_NAME,
    pass: process.env.APP_PASSWORD,
    host: process.env.HOST,
    targetEmail: process.env.TARGET_EMAIL,
    mailPort: process.env.MAIL_PORT ,
    
    
}

const sendMail = async (formData) => {
    
    try {
        const transporter = nodemailer.createTransport({
            host: creds.host,
            port: 587,
            secure: false, 
            auth: {
              user: creds.user,
              pass: creds.pass,
            },
          });
        

        const mailOptions = {
            from: creds.user,
            to: creds.targetEmail,
            subject: process.env.EMAIL_SUBJECT,
            text: `Imię: ${formData.name}\nEmail Nadawcy: ${formData.email}\nNumer telefonu: ${formData.phone}\nTemat: ${formData.topic}\nWiadomość: ${formData.message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        const mailData = {
            date: "",
    email: formData.email,
    phone: formData.phone,
    subject: formData.topic,
    message: formData.message
        }

        await connectToMariaDB(mailData);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export default sendMail;
