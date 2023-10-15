import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/uniblox';
import _ from 'lodash'

/**
 * makeMongoConnection - to establish mongo connection.
 * @param {*} uri - required cloud uri or local uri in order to setup db connection.
 * @returns 
 */

function makeMongoConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (!_.isEqual(process.env.NODE_ENV, 'TEST')) {
    db.on('error', function (error) {
      console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
      db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`.green));
    });

    db.on('connected', function () {
      mongoose.set('debug', function (col, method, query, doc) {
        console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`.green);
      });
      console.log(`MongoDB :: connected ${this.name}`.green);
    });

    db.on('disconnected', function () {
      console.log(`MongoDB :: disconnected ${this.name}`.red);
    });

  }

  return db;
}

const uniblox = makeMongoConnection(MONGO_URI);
export default uniblox;
