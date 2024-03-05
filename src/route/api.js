import express from "express";
import APIController from "../controller/APIController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers); // method GET - READ DATA
    router.post('/create-user', APIController.createUser); //method POST - CREATE DATA
    router.put('/edit-user', APIController.updateUser);    //method PUT - UPDATE DATA
    router.delete('/delete-user/:id', APIController.deleteUser); //method DELETE - DELETE DATA

    return app.use('/api/v1', router);
};

export default initAPIRoute;