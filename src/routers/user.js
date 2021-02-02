const express=require('express')
const User=require('../models/user');
const router= new express.Router();
const authen= require('../middleware/authen');

router.post('/users', async (req, res) => {
    const user=new User(req.body);

    try {
        await user.save();
        const token= await user.generateAuthToken();
        res.status(201).send( { user, token});
    }
    catch (e) {
        res.status(400).send(e);
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user= await User.findByCredentials(req.body.email, req.body.password);
        const token= await user.generateAuthToken();
        res.send({
            user,
            token,
        });
    } catch (e) {
        res.status(400).send(e);
    }
})


router.get('/users/me', authen ,async (req, res) => {
    res.send(req.user);
})
router.get('/users/:id', async (req, res) => {

    try {
        const user= await User.findById(req.params.id);
        if (!user){
            return res.status(404).send('User not found!');
        }
        res.send(user);

    } catch (e) {
        res.status(500).send(e);
    }   
})

router.post('/users/logout', authen, async (req, res, next) => {
    try{
        req.user.tokens= req.user.tokens.filter( (token) => {
            return token.token !== req.token;
        })

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', authen ,async (req, res, next) => {
    try{
        req.user.tokens= [];
        await req.user.save();

        res.send('logged out!');
    } catch (e){
        res.status(500).send(e);
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates=Object.keys(req.body);
    const allowedUpdates=['name', 'emails', 'password', 'age'];
    const isValidOperation= updates.every( (update)=>{
        return allowedUpdates.includes(update);
    })

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'});
    }


    try {
        const user= await User.findById(req.params.id);

        updates.forEach( (update) => {
            user[update] = req.body[update];
        })

        await user.save();

        //const user= await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!user){
            return res.status(404).send('User not found!');
        }
        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }
})
router.delete('/users/:id', async (req, res) => {
    try {
        const user= await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).send('User not found!');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }

})

module.exports= router;