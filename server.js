const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: 'rzp_test_CDtfWK3Ko8Mh4w',
    key_secret: 'wZ2KiuaYUSvnZWfz0rX8FzU5',
});

app.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'receipt#1',
            payment_capture: 1,
        };

        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
