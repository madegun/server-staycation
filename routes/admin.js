const express = require('express');
const router = express.Router();
const {upload, uploadMultiple} = require('../middlewares/multer');
const adminController = require('../controllers/adminController');

const auth = require('../middlewares/auth');

router.get('/login', adminController.viewLogin);
router.post('/login', adminController.actionLogin);
router.use(auth);
router.get('/logout', adminController.actionLogout);
router.get('/dashboard', adminController.viewDashboard);


router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.put('/category', adminController.editCategory);
router.delete('/category/:id', adminController.deleteCategory);

router.get('/bank', adminController.viewBank);
router.post('/bank', upload, adminController.addBank);
router.put('/bank', upload, adminController.editBank);
router.delete('/bank/:id', adminController.deleteBank);

//endpoint Items
router.get('/item', adminController.viewItem);
router.get('/item/:id', adminController.ShowEditItem);
router.post('/item', uploadMultiple, adminController.addItem);
router.get('/item/show-image/:id', adminController.showImageItem);
router.put('/item/:id', uploadMultiple, adminController.editItem);
router.delete('/item/:id/delete', adminController.deleteItem);

//endpoint Feature
router.get('/item/show-detail-item/:itemId', adminController.viewDetailItem);
router.post('/item/add/feature', upload, adminController.addFeature);
router.put('/item/edit/feature', upload, adminController.editFeature);
router.delete('/item/:itemId/feature/:id',adminController.deleteFeature);

//endpoint activity
router.post('/item/add/activity', upload, adminController.addActivity);
router.put('/item/edit/activity', upload, adminController.editActivity);
router.delete('/item/:itemId/activity/:id', adminController.deleteActivity);



router.get('/booking', adminController.viewBooking);
router.get('/booking/:id', adminController.viewDetailBooking);
router.put('/booking/:id/confirmation', adminController.actionConfirmasiBayar);
router.put('/booking/:id/reject', adminController.actionRejectBayar);

module.exports = router;
