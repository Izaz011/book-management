const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const mw=require('../middlewares/auth')

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser)
router.post("/books", bookController.createBook)
router.get("/books",bookController.getBooks)
router.put("/books/:bookId",bookController.updateBook)
router.get('/books/:bookId',bookController.getBookById)
router.delete("/books/:bookId",bookController.deleteBook)

router.all("/*", function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" })
})

module.exports = router;