import mongoose from 'mongoose';
require('dotenv').config(); // loading .env file


/* class Connection {
  constructor() {
    const url =
      process.env.MONGODB_URI || `mongodb://tvviem:Password123@localhost:27017/quizapp`;
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(url);
  }
}

export default new Connection(); */

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
export default conn;

/* conn.readyState in cases {
  0: disconnected, 
  1: connected, 
  2: connecting,
  3: disconnecting
} */