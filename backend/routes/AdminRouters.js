const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController')

router.post('/AdminRegisterData',AdminController.getAdminRegData);
router.get('/getAdminData', AdminController.sendAdminData);
router.get('/getSuperAdminData', AdminController.sendSuperAdminData);
router.get('/getSingleAdmin/:eml', AdminController.sendEditAdminData);
router.put('/postUpdatedData', AdminController.getUpdatedData);
router.delete('/getDeleteAdmin',AdminController.getDeleteAdmin);
router.get('/getSuperAdminRecord/:eml',AdminController.findSuperAdmin);
router.post('/updateSuperAdmin', AdminController.UpdateSuperAdminProfile);

module.exports = router;   