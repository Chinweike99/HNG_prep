import express from 'express'
import 'dotenv/config';
import { integration_config } from './integration_config.js';
import { fetchAndSendRates } from '../index.js';
import { fetchExchangeRates } from '../index.js';

import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to exchange notifier");
})

app.get('/notifier', (req, res) => {
    res.send(integration_config)
    // console.log(integration_configs)
})


app.get('/exchange-rate', async (req, res) => {
    try {
        const rates = await fetchExchangeRates();
        if (rates) {
            res.status(200).json({
                success: true,
                message: "Current exchange rates",
                rates
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to fetch exchange rates"
            });
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching exchange rates"
        });
    }
});



app.post('/notifier-hook', (req, res) => {
    console.log("Webhook Body:", req.body.message);
    res.status(200).send("Webhook received successfully");
})

app.post('/tick', async (req, res) => {
    console.log("Telex tick received.");
    await fetchAndSendRates();
    res.status(200).json({ message: "Exchange rates fetched and email sent!" });
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost/${port}`)
})