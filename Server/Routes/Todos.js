const express = require("express");
const { addTask,updateTask,deleteTask,getTasks } = require("../Controllers/Controller.Todos");

const router = express.Router();
const isAuth = require("../Middlewares/auth");


router.post("/add", isAuth, addTask);
router.put("/update/:id'",isAuth,updateTask);
router.get("/get",isAuth,getTasks);
router.delete("/delete/:id",isAuth,deleteTask);


module.exports = router;