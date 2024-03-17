import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import sendMail from './controller/sendmail.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
