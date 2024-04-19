import nodemailer from 'nodemailer';
import 'dotenv/config';

const creds = {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD
}

const sendMail = async (formData) => {
    console.log(creds);
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zenbox.pl",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: creds.user,
              pass: creds.pass,
            },
          });
        

        const mailOptions = {
            from: process.env.USER,
            to: "pavulon3@gmail.com",
            subject: "Nowa wiadomość ze strony Variotech.pl",
            text: `Imię: ${formData.name}\nEmail Nadawcy: ${formData.email}\nNumer telefonu: ${formData.phone}\nTemat: ${formData.topic}\nWiadomość: ${formData.message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export default sendMail;
