const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")

router.post('/register', userController.createUser);
router.post("/books", bookController.createBook)
router.post('/login', userController.loginUser)

router.all("/*", function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" })
})

module.exports = router;