const express = require('express');
const Contact = require('../models/contacts');

const router = express.Router();
router.get('/contacts',(req, res, next)=>{
    Contact.find(function(err, contacts){
        res.json(contacts);
    })
});

router.post('/contacts',(req, res, next)=>{
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json(err);
        }else{
            res.json({msg: 'Contact added sucessfully'});
        }
    })
});

router.delete('/contacts/:id',(req, res, next)=>{
    Contact.remove({_id: req.params.id},function(err, result){
        if(err){
            res.json({msg: 'Failed to remove contact'});
        }else{
            res.json({msg: 'Contact removed sucessfully'});
        }
    })
});

module.exports = router;