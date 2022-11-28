userModel = require('../models/userModel')

let createUser = async function (req, res) {
    try {
        const data = req.body;
        let { title, name, phone, email, password, address } = data;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
        let phoneRegex = /^[0]?[6789]\d{9}$/;
        let nameRegex = /^[a-zA-Z ]+$/;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Request body cannot be empty" })
        }
        if (!title) {
            return res.status(400).send({ status: false, message: "title is mandatory" })
        }
        if (!name) {
            return res.status(400).send({ status: false, message: "name is mandatory" });
        }
        if (name.length == 0 || !(nameRegex.test(name))) {
            return res.status(400).send({ status: false, message: "name should be valid name" })
        }
        if (!phone) {
            return res.status(400).send({ status: false, message: "phone is mandatory" })
        }
        if (!phoneRegex.test(phone)) {
            return res.status(400).send({ status: false, message: "phone no should be valid" })
        }
        const data1 = await userModel.findOne({ phone: phone });
        if (data1) {
            return res.status(400).send({ status: false, message: "phone number is already present in College DB" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "email is mandatory" })
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "email is invalid" })
        }
        const data2 = await userModel.findOne({ email: email });
        if (data2) {
            return res.status(400).send({ status: false, message: "email is already present in College DB" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is mandatory" })
        }
        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "password should be valid" })
        }
        if (!address) {
            return res.status(400).send({ status: false, address: "address is mandatory" })
        }
        const savedData = await userModel.create(data);
        return res.status(201).send({ status: true, data: savedData })
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
}

module.exports.createUser = createUser;