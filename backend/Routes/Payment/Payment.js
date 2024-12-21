const express = require('express');
const router = express.Router();
const paymentController = require('../../Controllers/Payment/PaymentController');
const authMiddleware = require('../../Middleware/AuthMiddleware/AuthMiddleware');


// Route to create checkout session
router.post('/create-checkout-session',authMiddleware, paymentController.createCheckoutSession);

// Route to retrieve session status
router.get('/session-status',authMiddleware, paymentController.getSessionStatus);

router.post('/complete-session',authMiddleware, paymentController.completeSession);


module.exports = router;
