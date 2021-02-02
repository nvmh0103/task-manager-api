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



router.get('/tasks', authen ,async (req, res) => {
    try{
        const task= await Task.find({ owner: req.user.id});
        
        res.send(task);
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