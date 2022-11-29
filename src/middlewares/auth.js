const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token)
            return res.status(400).send({ status: false, msg: "Token must be present" })
        let decodedToken = jwt.verify(token, "booksManagementGroup32")
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "Token is invalid" })
        req.token = decodedToken
        next()
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

const authorization = async function (req, res, next) {
    try {
        const authorId = req.token.userId
        const bookId = req.params.bookId

        const bookData = await bookModel.findOne(bookId)
        if (!bookData)
            return res.status(400).send({ status: false, msg: "invalid bookId" })
        const booksAutherId = bookData.authorId
        if(booksAutherId!==authorId)
        {
            return res.status(400).send({ status: false, msg: "Not authorized" })
        }
        next()
    }catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

module.exports = { authentication, authorization }
