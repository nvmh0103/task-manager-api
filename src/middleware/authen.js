const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/user');


const auth= async (req, res, next) =>{
    try{
        const token= req.header('Authorization').replace('Bearer', '').trim();
        const decoded= jwt.verify(token, 'thisisme');
        const user= await User.findOne( { _id: decoded._id, 'tokens.token': token});
        if (!user){
            throw new Error();
        }
        req.user= user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please log in!'});
    }

}

module.exports=auth;