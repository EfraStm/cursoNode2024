import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";

const router=Router();
//router.get('/',tasksController.getTasks);
//router.post('/',tasksController.createTask);
router
    .route('/')
    .get(tasksController.getTasks)
    .post(tasksController.createTask);
router
    .route('/:id')
    .get(tasksController.getTask)
    .put(tasksController.updateTask)
    .delete(tasksController.deleteTask)
    .patch(tasksController.taskDone);
export default router;