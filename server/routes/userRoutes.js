const express = require('express')
const { registerController, loginController, logoutController, checkCookieController, userDetailsController } = require("../controllers/userController")
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.get("/check-cookie", checkCookieController)
router.get("/user-details", authMiddleware, userDetailsController)

module.exports = router