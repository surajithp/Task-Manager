let tasks = [{
    taskId: "1",
    title: "Prepare lunch",
    description: "Make Dal Fry for today lunch ",
    isCompleted: false
}]


exports.getAllTasks = async(req, res) => {
      const allTasks = tasks;
      if(!allTasks){
         res.status(400).send({"error":"no tasks found"})
      }else{
         const queryParams = req.query
         if(queryParams.status && queryParams.status === 'completed'){
            const completedTasks = allTasks.filter(task=>task.isCompleted)
            return res.status(200).send({message:"here are the found tasks:", tasks: completedTasks})
         }
         return res.status(200).send({message:"here are the found tasks:", tasks : allTasks})
      }
}

exports.getTask = async(req, res) => {
    try{
    const taskDetails = tasks.find(task=>task.taskId === req.params.taskId)
    if (taskDetails) {
        return res.status(200).send({ message: "Task details fetched successfully", task: taskDetails });
    }else{
        return res.status(400).send({ message: "Unable to fetch task details", taskId: req.params.taskId });
    }
   } catch (error) {
     return res.status(400).send({ error: "An error has occurred, unable to get task" });
   }
}

exports.createNewTask = async(req, res)=>{
    try {
        const task = req.body
        if(task.title && task.description && typeof task.isCompleted === 'boolean'){
            tasks.push(task)
            return res.status(200).send({ message: "Task added successfully", task });
        }
        else{
            return res.status(422).send({ error: "Title and description should not be empty and isCompleted should be boolean" });
        }
    } catch (error) {
        return res.status(400).send({ error: "An error has occurred, unable to add task" });
    }
}

exports.updateTask = async(req, res) => {
   try{
    const task = req.body
    const taskId = req.params.taskId
    const selectedTask = tasks.find(task=>task.taskId === taskId)
    const updatedTask = {...selectedTask, ...task}
    tasks.forEach(task=>{
        if(task.taskId === taskId){
            task = updatedTask
        }
    })
   if (!updatedTask) {
      return res.status(400).send({ message: "Could not update Task" });
    }
    return res.status(200).send({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    return res.status(400).send({ error: "An error has occurred, unable to update task" });
  }
}

exports.deleteTask = async(req, res) => {
    try{
      tasks = tasks.filter(task=>task.taskId !== req.params.taskId)
      const deletedTask = tasks.find(task=>task.taskId === req.params.taskId)
      if(deletedTask){
         return res.status(400).send({message:"could not delete task"})
      }else{
         return res.status(200).send({message:"task deleted successfully!"})
      }
   }catch(error){
      return res.status(400).send({error:"an error occured, unable to delete task"})
   }
}
