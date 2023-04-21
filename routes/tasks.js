const router = require("express").Router();

const tasksController = require("../controllers/taskManager");


router.get("/", tasksController.getAllTasks);

router.get('/:taskId', tasksController.getTask);

router.post("/", tasksController.createNewTask);

router.put('/:taskId', tasksController.updateTask);

router.delete('/:taskId', tasksController.deleteTask);


module.exports = router;

