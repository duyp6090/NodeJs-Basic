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
            //console.log(results);
            return res.send({ dataUser: JSON.stringify(results) })
        }
    );
}

let createNewUser = (req, res) => {
    pool.execute(
        'INSERT INTO users(FirstName, LastName, Email, Address) VALUES(?,?,?,?)',
        [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Address]
    );
    return res.redirect('/');
}

let deleteUser = (req, res) => {
    pool.execute(
        'DELETE FROM users WHERE `id` = ?', [req.body.userId]
    );
    return res.redirect('/');
}

let editUser = (req, res) => {
    let idUser = req.params.userId;
    pool.execute(
        'SELECT * FROM users WHERE `id` = ?', [idUser],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            return res.render('update.ejs', { data: results });
        }
    );
}

let updateUser = (req, res) => {
    pool.execute(
        'UPDATE users SET `FirstName` = ?, `LastName` = ?, `Email` = ?, `Address` = ? WHERE `id` = ?',
        [req.body.FirstName, req.body.LastName, req.body.Email, req.body.Address, req.body.userId],
    );
    return res.redirect('/');
}

module.exports = {
    getHomepage,
    getDetailUser,
    createNewUser,
    deleteUser,
    editUser,
    updateUser
}