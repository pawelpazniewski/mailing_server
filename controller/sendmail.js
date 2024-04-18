import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendMail = async (formData) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zenbox.pl",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "igor@variotech.pl",
              pass: "8AA!vn#b6ddV",
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
