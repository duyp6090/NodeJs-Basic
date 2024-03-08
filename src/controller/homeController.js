//Get data from database
import pool from "../config/connectDB.js";
import multer from "multer";


let getHomepage = (req, res) => {
    //logic connect to database
    let data = [];
    pool.query(
        'SELECT * FROM `users`',
        ['Rick C-137', 53],
        function (err, results, fields) {
            console.log(fields);  //fields contains extra meta data about results, if available
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
            console.log(fields);  //fields contains extra meta data about results, if available
            console.log(results);
            return res.render('detailuser.ejs', { dataUser: results })
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
            console.log(fields);  //fields contains extra meta data about results, if available
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

let uploadFilePage = (req, res) => {
    res.render('uploadFile.ejs');
}

//const upload = multer().single('avatar');

let handleUploadFile = (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    //Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="./upload-file">Upload another image</a>`);
}


let handleMulUpLoadFile = (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./upload-file">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage, getDetailUser, createNewUser, deleteUser, editUser, updateUser,
    uploadFilePage, handleUploadFile, handleMulUpLoadFile
}