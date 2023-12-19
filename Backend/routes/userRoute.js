const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.get("/liste",userController.liste)
router.post("/insertFiliere",userController.insertFiliere)
router.post("/delete",userController.delete)
router.post("/insertmatiere",userController.insertmatiere)
router.get("/getAll",userController.getAll)
router.post("/delMatiere",userController.delMatiere)
router.post("/getspecifyMatiere",userController.getspecifyMatiere)
router.post("/getFiliereName",userController.getFiliereName)
router.post("/loginAdmin",userController.loginAdmin)
router.post("/insertActivite",userController.insertActivite)
router.get("/vieuw",userController.vieuw)
router.post("/getidForName",userController.getidForName)
router.post("/scearch_name",userController.scearch_name)
router.post("/delete_article",userController.delete_article)
router.post("/suggestion",userController.suggestion)
module.exports = router;