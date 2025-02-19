import 'dotenv/config';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import cron from 'node-cron'

const api_key = process.env.API_KEY;

const reciever_gmail = process.env.RECIEVER_GMAIL
const user_gmail = process.env.GMAIL_USER
const user_password = process.env.GMAIL_PASS


const fetchExchangeRates = async () =>{
    const url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/NGN`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data.result === 'success'){
            const rates = data.conversion_rates;
            return{
                NGN: 1,
                USD: rates.USD,
                EUR: rates.EUR,
                GBP: rates.GBP,
                AED: rates.AED,
                AWG: rates.AWG
            };
        }else {
            throw new Error("Unable to fetch exchange rates");
        }
    }catch(error){
           console.error("Error fecthing exchange rates: ", error);
           return null;
    }
};


const sendMail = async (rates) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: user_gmail,
            pass: user_password
        },
    });

    const mailOptions = {
        from: user_gmail,
        to: reciever_gmail,
        subject: "Current exchange rates (NGN to USD, EUR, GBP, AED, AWD)",
        text: `Current Exchange rates on ${new Date()} :
        NGN: 1
        USD: ${rates.USD}
        EUR: ${rates.EUR}
        GBP: ${rates.GBP}
        AED: ${rates.AED}
        AWG: ${rates.AWG}
        `
    };
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully')
    }catch(error){
        console.log(error)
    }
}

    // Function to fetch rates and send email
    const fetchAndSendRates = async () => {
        const rates = await fetchExchangeRates();
        if(rates){
            console.log('Fetched exchange rates:', rates);
            await sendMail(rates)

            try {
                const telexWebHook = "https://ping.telex.im/v1/webhooks/01951d09-6c39-77a0-990c-7da52f8ad219";
                const telexResponse = await fetch(telexWebHook, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: `Current Exchange rates on ${new Date()} :
                    NGN: 1
                    USD: ${rates.USD}
                    EUR: ${rates.EUR}
                    GBP: ${rates.GBP}
                    AED: ${rates.AED}
                    AWG: ${rates.AWG}`
                    })
                });
                if(!telexResponse.ok){
                    throw new Error(`Telex notification failed with status: ${telexResponse.status}`)
                }
                console.log("Telex notification sent successfully!");
            } catch (error) {
                throw new error(error)
            }
        }
    }

    // Schedule the task to run intervally
    cron.schedule('*/50  * * * *', () => {
        console.log('Fetching exchange rates ...');
        fetchAndSendRates();
    })

console.log('Exchange rate notifier started. Waiting for the next run...');

export { fetchAndSendRates,fetchExchangeRates };
// export {  };

