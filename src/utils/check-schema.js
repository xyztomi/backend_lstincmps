const sqlite = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite.Database(dbPath);

db.serialize(() => {
  db.all(`PRAGMA table_info(users);`, (err, rows) => {
    if (err) {
      console.error('Error querying users table schema', err);
    } else {
      console.log('Users table schema:', rows);
    }
  });
});

db.close();
