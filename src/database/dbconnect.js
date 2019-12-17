import mongoose from 'mongoose';
require('dotenv').config(); // loading .env file

//mongoose.connect(process.env.DBCONN_DEV, { useNewUrlParser: true });
const dbcon = mongoose.connect(process.env.DBCONN_DEV, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true 
  }).then(() => console.log('Connected to Mongodb with Mongoose'))
  .catch(err => console.error('Error Connected! \n' + err));

//const dbcon = mongoose.createConnection();
//dbcon.on('error', err => { console.error(err); });
//dbcon.once('open', () => console.log('Connected to Mongodb with Mongoose'))
export default { dbcon };