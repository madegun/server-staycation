
const router = require('express').Router();
const apiController = require('../controllers/apiController');
const {upload} = require('../middlewares/multer');

router.get('/member/landing-page', apiController.landingPage);
router.get('/member/detail-page/:id', apiController.detailPage);
router.post('/member/booking-page', upload, apiController.bookingPage);

module.exports = router;
