const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth')

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connection successfull'))
.catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.API_PORT, () => {
    console.log('backend server working on port 5000');
});