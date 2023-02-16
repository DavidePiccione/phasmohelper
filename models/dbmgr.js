const sqlite = require('better-sqlite3-with-prebuilds');

//OPEN DATABASE
let db = new sqlite.Database('../phantoms.db', sqlite.OPEN_READONLY , (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the phantoms database.');
  });

//QUERY DATABASE
  console.log(db.all("SELECT * FROM Phantoms"));

//CLOSE DATABASE
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });