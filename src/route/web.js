import express from "express";
import homecontroller from "../controllers/homecontroller"
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController'
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homecontroller.getHomePage)
    router.get('/crud', homecontroller.getCRUD)
    router.post('/post-crud', homecontroller.postCRUD)
    router.get('/get-crud', homecontroller.displayGetCRUD)

    //api
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handeCreateNewUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.put('/api/edit-user', userController.hanleEditUser)
    router.get('/api/allcode', userController.getAllCode)
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)

    return app.use("/", router)
}
module.exports = initWebRoutes 