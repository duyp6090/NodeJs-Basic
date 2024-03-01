// Get the client
import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
});

// A simple SELECT query
// connection.query(
//     'SELECT * FROM `users`',
//     function (err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         //console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

// Using placeholders
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );

export default connection;