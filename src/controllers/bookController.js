const { isValidObjectId } = require("mongoose")
const moment = require("moment")
const bookModel = require("../models/bookModel")

const isbnRegex = /^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/

const Regex = /^([A-Za-z ]+){3,}$/

const isValid = function (value) {
    if (typeof value === "undefined" || value === "null") return false;

    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}


const createBook = async function (req, res) {
    try {
        const data = req.body
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "No data provided" })
        }

        if (!isValid(title) || !Regex.test(title)) {
            return res.status(400).send({ status: false, msg: "please provide valid title" })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: "please provide valid excerpt" })
        }

        if (!isValidObjectId(userId) || !userId) {
            return res.status(400).send({ status: false, msg: "Please provide valid userId" })
        }

        if (!isValid(ISBN) || !isbnRegex.test(ISBN)) {
            return res.status(400).send({ status: false, msg: "please provide valid ISBN" })
        }

        if (!isValid(category) || !Regex.test(category)) {
            return res.status(400).send({ status: false, msg: "please provide valid category" })
        }

        if (!isValid(subcategory) || !Regex.test(subcategory)) {
            return res.status(400).send({ status: false, msg: "please provide valid subcategory" })
        }
        if (!releasedAt || !moment(releasedAt, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).send({ status: false, msg: "date is not present or date format is not valid  " })
        }

        const duplicateData = await bookModel.findOne({ $or: [{ title: title }, { ISBN: ISBN }] })
        if (duplicateData) {
            return res.status(400).send({ status: false, msg: "title or ISBN is already given" })
        }

        const createData = await bookModel.create(data)

        return res.status(201).send({ status: true, msg: "Success", data: createData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

module.exports = { createBook }