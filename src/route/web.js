import express from "express";
import homeController from "../controller/homeController.js";
import multer from "multer";
import path from "path";
import appRoot from "app-root-path";

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/");
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');
const upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 10);

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:userId', homeController.getDetailUser);
    router.post('/create-new-user', homeController.createNewUser);

    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:userId', homeController.editUser);
    router.post('/update-user', homeController.updateUser);

    router.get('/upload-file', homeController.uploadFilePage);
    router.post('/profile', (req, res, next) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            else {
                next();
            }
        })
    }, homeController.handleUploadFile);
    router.post('/upload-multiple-images', (req, res, next) => {
        upload1(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send('LIMIT_UNEXPECTED_FILE');
            }
            else if (err) {
                res.send(err.message);
            }
            else {
                next();
            }
        })
    }, homeController.handleMulUpLoadFile);

    return app.use('/', router);
};

export default initWebRoute;