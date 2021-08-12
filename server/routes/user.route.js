const router = require("express").Router();
const {userController} = require("../controller/user.controller");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/resetpassword", userController.resetPassword);
router.post("/newpassword", userController.newPassword);

module.exports = router;