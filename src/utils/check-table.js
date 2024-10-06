const sqlite = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite.Database(dbPath);

db.serialize(() => {
  // Check if users table exists and has data
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      console.error('Error querying users table', err);
    } else {
      console.log('Users table:', rows);
    }
  });

  // Check if items table exists and has data
  db.all(`SELECT * FROM items`, (err, rows) => {
    if (err) {
      console.error('Error querying items table', err);
    } else {
      console.log('Items table:', rows);
    }
  });
});

db.close();
