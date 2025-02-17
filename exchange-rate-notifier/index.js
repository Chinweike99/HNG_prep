import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import cron from 'node-cron'

const API_KEY = process.env.API_KEY;

const GMAIL_USER = 'email'
const GMAIL_PASS = 'gmailpassword'


const fetchExchangeRates = async () =>{
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/NGN`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data.result === 'success'){
            const rates = data.conversion_rates;
            return{
                USD: rates.USD,
                EUR: rates.EUR,
                GBP: rates.GBP,
            };
        }else {
            throw new Error("Unable to fetch exchange rates");
        }
    }catch(error){
           console.error("Error fecthing exchange rates: ", error);
           return null;
    }
};


const sendMail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: GMAIL_USER,
            pass: GMAIL_PASS
        },
    });

    const mailOptions = {
        from: GMAIL_USER,
        to: GMAIL_USER,
        subject: "Current exchange rates (NGN to USD, EUR, GBP)",
        text: `Here are the current exchange rates:
        Naira (NGN): ${rates.NGN} 
        USD: ${rates.USD}
        EUR: ${rates.EUR}
        GBP: ${rates.GBP}
        `
    };
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully')
    }catch(error){
        console.log(error)
    }

    // Function to fetch rates and send email
    const fetchAndSendRates = async () => {
        const rates = await fetchExchangeRates();
        if(rates){
            console.log('Fetched exchange rates:', rates);
            await sendMail(rates)
        }
    }

    // Schedule the task to run every 20  minutes
    cron.schedule('*/20 * * * *', () => {
        console.log('Fetching exchange rates ...');
        fetchAndSendRates();
    })
}

console.log('Exchange rate notifier started. Waiting for the next run...');
