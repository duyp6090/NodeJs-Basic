import pool from "../config/connectDB.js";

let getAllUsers = (req, res) => {
    pool.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            console.log(results);
            return res.status(200).json({
                message: 'OK',
                data: results
            });
        }
    );
}

let createUser = (req, res) => {
    let { FirstName, LastName, Email, Address } = req.body;
    if (!FirstName || !LastName || !Email || !Address) {
        return res.status(200).json({
            message: 'missing information'
        })
    }

    pool.execute(
        'INSERT INTO users(FirstName, LastName, Email, Address) VALUES(?,?,?,?)',
        [FirstName, LastName, Email, Address]
    );

    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = (req, res) => {
    let { FirstName, LastName, Email, Address, id } = req.body;
    if (!FirstName || !LastName || !Email || !Address || !id) {
        return res.status(200).json({
            message: 'missing information'
        })
    }

    pool.query(
        'SELECT * FROM users WHERE `id` = ?', [id],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            if (results.length == 0) {
                return res.status(200).json({
                    message: 'User does not exist to update'
                })
            }
        }
    );

    pool.execute(
        'UPDATE users SET `FirstName` = ?, `LastName` = ?, `Email` = ?, `Address` = ? WHERE `id` = ?',
        [FirstName, LastName, Email, Address, id],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            return res.status(200).json({
                message: "update information of user successfully"
            })
        }
    );
}

let deleteUser = (req, res) => {
    let idUser = req.params.id;
    pool.query(
        'SELECT * FROM users WHERE `id` = ?', [idUser],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            if (results.length == 0) {
                return res.status(200).json({
                    message: 'User does not exist'
                })
            }
        }
    )

    pool.execute(
        'DELETE FROM users WHERE `id` = ?', [idUser],
        function (err, results, fields) {
            //console.log(fields); // fields contains extra meta data about results, if available
            return res.status(200).json({
                message: "delete user successfully"
            })
        }
    );
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}