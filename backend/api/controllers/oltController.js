const mongoose = require('mongoose');
const olt = mongoose.model('olt');
const pon = mongoose.model('pon');

exports.list_all_olt = (req, res)=>{
    olt.find({},(err,olts)=>{
        if(err) res.send(err);
        res.json(olts);
    })
}

exports.create_a_olt = (req, res)=>{
    const newOlt = new olt(req.body);
    newOlt.save((err, olt)=>{
        if(err) res.send(err);
        res.json(olt);
    })
}

exports.read_a_olt = (req, res)=>{
    olt.findById(req.params.oltId,(err, olt)=>{
        if(err) res.send(err);
        res.json(olt);
    })
}

exports.read_a_pon = (req, res)=>{
    pon.find({olt: req.params.oltId},(err, olts)=>{
        if(err) res.send(err);
        res.json(olts);
    })
}

exports.update_a_olt = (req, res)=> {
    olt.findByIdAndUpdate(
        {_id: req.params.oltId},
        req.body,
        {new: true},
        (err, olt)=>{
            if(err) res.send(err);
            res.json(olt);
        }
    )
}

exports.delete_a_olt = (req, res)=>{
    olt.deleteOne({olt_Name: req.params.oltId}, err =>{
        if(err) res.send(err);
        res.json({
            message:"OLT Succesfully Deleted",
            olt_Name: req.params.oltId
        })
    })
}