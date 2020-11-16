const express = require("express");
const router = express.Router();

const todoController = require('../controllers/toDoController');

router.get('/',todoController.getTasks);

router.post('/',todoController.addEdit);

router.get('/addEdit/:id',todoController.update)

router.get('/addEdit/',todoController.add)

router.get('/delete/:id',todoController.deleteTask)
module.exports = router;