import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import https from 'https';
import fs from 'fs';
import sendMail from './controller/sendmail.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: [process.env.CORS_SOURCE_DEV,process.env.CORS_SOURCE_PROD] }));

app.post('/send', async (req, res) => {
    const formData = req.body;

    // Sprawdzenie, czy żadna z wartości nie jest pusta
    if (!formData.email || !formData.name || !formData.phone || !formData.topic || !formData.message) {
        
        console.log(`Ivalid request from ${req.ip}`)
        return res.status(400).json({ error: 'Invalid request' });
        
    }

    // Wywołanie funkcji sendMail do wysłania e-maila
    const success = await sendMail(formData);
    if (success) {
        console.log('Email sent successfully');
        return res.status(201).json({ success: 'Data received and email sent' });
    } else {
        console.log('Failed to send email');
        return res.status(500).json({ error: 'Failed to send email' });
    }
});

// Wczytanie klucza prywatnego i certyfikatu SSL/TLS
const privateKey = fs.readFileSync('/etc/letsencrypt/live/vt-mail.pazniewski.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vt-mail.pazniewski.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/vt-mail.pazniewski.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Stworzenie serwera HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
