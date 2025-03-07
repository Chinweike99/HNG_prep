import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const api_key = process.env.API_KEY;
const receiver_gmail = process.env.RECEIVER_GMAIL;
const user_gmail = process.env.GMAIL_USER;
const user_password = process.env.GMAIL_PASS;

// Function to fetch exchange rates
const fetchExchangeRates = async () => {
  const url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/NGN`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.result === 'success') {
      const rates = data.conversion_rates;
      return {
        NGN: 1,
        USD: rates.USD,
        EUR: rates.EUR,
        GBP: rates.GBP,
        AED: rates.AED,
        AWG: rates.AWG,
      };
    } else {
      throw new Error('Unable to fetch exchange rates');
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

// Function to send an email
const sendMail = async (rates) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user_gmail,
      pass: user_password,
    },
  });

  const mailOptions = {
    from: user_gmail,
    to: receiver_gmail,
    subject: 'Current exchange rates (NGN to USD, EUR, GBP, AED, AWG)',
    text: `Current Exchange rates on ${new Date()} :
    NGN: 1
    USD: ${rates.USD}
    EUR: ${rates.EUR}
    GBP: ${rates.GBP}
    AED: ${rates.AED}
    AWG: ${rates.AWG}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Endpoint for integration.json
app.get('/integration.json', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.json({
    data: {
      descriptions: {
        app_name: 'Exchange Rate Monitor',
        app_description: 'Monitors NGN exchange rates and sends email updates',
        app_url: baseUrl,
        app_logo: 'https://i.imgur.com/lZqvffp.png',
        background_color: '#fff',
      },
      integration_type: 'interval',
      settings: [
        { label: 'interval', type: 'text', required: true, default: '*/10 * * * * *' },
      ],
      tick_url: `${baseUrl}/tick`,
    },
  });
});

// Endpoint for /tick (initiates the exchange rate check)
app.post('/tick', async (req, res) => {
  console.log('Received /tick request from Telex');

  try {
    const rates = await fetchExchangeRates();
    if (rates) {
      await sendMail(rates);
    }
    res.status(202).json({ status: 'accepted' });
  } catch (error) {
    console.error('Error during tick:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
