const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const mw=require('../middlewares/auth')

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser)
router.post("/books",mw.authentication,mw.authorization, bookController.createBook)
router.get("/books",mw.authentication,bookController.getBooks)
router.put("/books/:bookId",mw.authentication,mw.authorization,bookController.updateBook)
router.get('/books/:bookId',mw.authentication,bookController.getBookById)
router.delete("/books/:bookId",mw.authentication,mw.authorization,bookController.deleteBook)
router.post("/books/:bookId/review",reviewController.createReview)

router.all("/*", function (req, res) {
    return res.status(404).send({ status: false, message: "Page Not Found" })
})

module.exports = router; 