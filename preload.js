// preload.js
const sqlite3 = require('sqlite3')
// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    db = new sqlite3.Database('./phantoms.db', sqlite3.OPEN_READONLY , (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the phantoms database.');
      });

    db.serialize(function () {
        db.all("SELECT * FROM Phantoms", function (err, tables) {
            for(let i=0; i<tables.length; i++) {
                span = document.createElement("span");
                text = document.createTextNode(tables[i].Name);
                span.appendChild(text);
                span.setAttribute('id', tables[i].Name);
                document.getElementById("flex-results").appendChild(span);
            }
        });
    });

    db.close();
})