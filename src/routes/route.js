express = require('express');
router = express.Router();
const userController= require("../controllers/userController")
const bookController=require("../controllers/bookController")

router.post('/register', userController.createUser);
router.post('/book',bookController.createBook)

router.all("/*",function (req,res){
    return res.status(404).send({status:false,message:"Page Not Found"})
})

module.exports = router;