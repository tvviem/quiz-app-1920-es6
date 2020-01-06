import mongoose from 'mongoose';
require('dotenv').config(); // loading .env file

/* export default class DbConnection {
  constructor() {
    this._conn=null;
  }
  connect() {
    this._conn = mongoose.createConnection(process.env.DBCONN_DEV, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      poolSize: 6
    });
    this._conn.once('error', (error) => {
      console.error('ERROR-CONN-DB: Could not identify DB Server: ' + error);
    });
  }
  
  get conn() {
    return this._conn;
  }
  static getInstance() {
    if(!instance || instance==='undefined') {
      instance = new DbConnection();
      instance.connect();
    }
    return instance
   }
} */
// use for multi connect 
const conn = mongoose.createConnection(process.env.DBCONN_DEV, { 
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