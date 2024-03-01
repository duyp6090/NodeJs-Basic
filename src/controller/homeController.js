// Get data from database
import connection from "../config/connectDB.js";

let getHomepage = (req, res) => {
    //logic connect to database
    let data = [];

    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            //console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
            for (var key in results) {
                data.push(results[key]);
            }
            console.log(">>>>>", data, JSON.stringify(data));
            return res.render('index.ejs', { dataUsers: JSON.stringify(data) });
        }
    );
    // console.log(">>>>>", data, JSON.stringify(data));
    // return res.render('index.ejs', { dataUsers: JSON.stringify(data) });
}

module.exports = {
    getHomepage
}