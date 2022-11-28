const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')

let stringRegex = /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/

const createBook = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "data is not present" })
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data
        if (!title || !excerpt || !userId || !ISBN || !category || !subcategory || !releasedAt) {
            return res.status(400).send({ status: false, msg: "Please provide all fields" })
        }
        const valisUser = await userModel.findOne({ userId: userId })
        if (!valisUser) {
            return res.status(400).send({ status: false, msg: "Please provide valid UserId" })
        }
        if (!stringRegex.test(title)) {
            return res.status(400).send({ status: false, msg: "Please provide valid title" })
        }
        if (!stringRegex.test(excerpt)) {
            return res.status(400).send({ status: false, msg: "Please provide valid excerpt" })
        }
        /* if (!stringRegex.test(ISBN)) {
            return res.status(400).send({ status: false, msg: "Please provide valid ISBN" })
        } */
        if (!stringRegex.test(category)) {
            return res.status(400).send({ status: false, msg: "Please provide valid category" })
        }
        if (!stringRegex.test(subcategory)) {
            return res.status(400).send({ status: false, msg: "Please provide valid subcategory" })
        }
        if (!stringRegex.test(releasedAt))
            return res.status(400).send({ status: false, msg: "Please provide valid subcategory" })
        const createdData = await bookModel.create(data)
        return res.status(201).send({ status: true, msg: createdData })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createBook = createBook