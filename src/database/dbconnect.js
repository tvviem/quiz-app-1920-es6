import mongoose from 'mongoose';
require('dotenv').config(); // loading .env file

//mongoose.connect(process.env.DBCONN_DEV, { useNewUrlParser: true });
mongoose.connect(process.env.DBCONN_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
const dbcon = mongoose.createConnection();
dbcon.on('error', err => { console.error(err); });
dbcon.once('open', () => console.log('Connected to Mongodb with Mongoose'))

export default dbcon;