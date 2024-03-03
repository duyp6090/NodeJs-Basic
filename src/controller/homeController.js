// Get data from database
import pool from "../config/connectDB.js";

let getHomepage = (req, res) => {
    //logic connect to database
    let data = [];

    pool.query(
        'SELECT * FROM `users`',
        ['Rick C-137', 53],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            for (var key in results) {
                data.push(results[key]);
            }
            return res.render('index.ejs', { dataUsers: data });
        }
    );
}

let getDetailUser = (req, res) => {
    let idUser = req.params.userId;
    let user = pool.execute(
        'SELECT * FROM `users` WHERE `id` = ?', [idUser],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            return res.send({ dataUser: JSON.stringify(results) })
        }
    );
}

let createNewUser = (req, res) => {
    pool.execute(
        'INSERT INTO users(FirstName, LastName, Email, Address) VALUES(?,?,?,?)',
        [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Address]
    )
    return res.redirect('/');
}

module.exports = {
    getHomepage,
    getDetailUser,
    createNewUser
}