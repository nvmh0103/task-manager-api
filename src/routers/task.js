const express= require('express');
const Task=require('../models/task');
const router= new express.Router();
const authen=require('../middleware/authen');


router.post('/tasks', authen,async (req, res) => {
     // const task= new Task(req.body);
    const task= new Task( {
        ...req.body,
        owner: req.user.id,
    })

    try{
        await task.save();
        res.status(201).send(task);
    }
    catch (e) {
        res.status(400).send(e);
    }

})


// GET /tasks?completed=false
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc(asc)
router.get('/tasks', authen ,async (req, res) => {
    const isCompleted={};
    const sort={}

    if (req.query.completed){
        isCompleted.completed= req.query.completed === 'true';
    }

    if (req.query.sortBy){
        const parts= req.query.sortBy.split(':');
        sort[parts[0]]= parts[1] === 'desc' ? -1 : 1;
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match: isCompleted,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        }).execPopulate()

        res.send(req.user.tasks);
    } catch (e) {
        res.status(404).send(e);
    }
    
})


router.get('/tasks/:id', authen,async (req, res) => {

    try {
        //const task= await Task.findById(req.params.id);
        const task= await Task.findOne( {_id: req.params.id, owner: req.user.id })
        if (!task){
            return res.status(404).send('Task not found!');
        }
        res.send(task);
    }   
    catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/tasks/:id', authen,async (req, res) => {
    const updates=Object.keys(req.body);
    const allowedUpdates=['description', 'completed'];
    const isValid=updates.every( (update)=> {
        return allowedUpdates.includes(update);
    })
    
    if (!isValid)
    {
        return res.status(404).send({ error: 'Invalid updates'});
    }

    try {
        const task= await Task.findOne( {_id: req.params.id, owner: req.user.id});
        
        if (!task){
            return res.status(404).send('Cant find tasks!');
        }

        updates.forEach( (update) => {
            task[update]= req.body[update];
        })

        await task.save();

        
        if (!task){
            return res.status(404).send('Task not found!');
        }
        res.send(task);
    } catch(e){
        res.status(500).send(e);
    }
})

router.delete('/tasks/:id', authen,async (req, res) => {
    try {
        const task= await Task.findOneAndDelete({ _id:req.params.id, owner: req.user.id});
        if (!task){
            return res.status(404).send('Task not found');
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports=router;