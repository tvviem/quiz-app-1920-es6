import mongoose from 'mongoose';
require('dotenv').config(); // loading .env file

// use for multi connect 
const conn = mongoose.createConnection(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 6
});
conn.once('error', (error) => {
  console.error('ERROR-CONN-DB: Could not identify DB Server: ' + error);
});
//conn.on('open', () => console.log('Connected to Mongodb with Mongoose'));
export default conn;

/* conn.readyState in cases {
  0: disconnected, 
  1: connected, 
  2: connecting,
  3: disconnecting
} */