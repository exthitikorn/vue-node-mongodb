const mongoose = require('mongoose');
const pon = mongoose.model('pon');
const ofccc = mongoose.model('ofccc');

exports.list_all_pon = (req, res)=>{
    pon.find({},(err,pons)=>{
        if(err) res.send(err);
        res.json(pons);
    }).populate('olt')
}

exports.create_a_pon = (req, res)=>{
    const newPon = new pon(req.body);
    newPon.save((err, pon)=>{
        if(err) res.send(err);
        res.json(pon);
    })
}

exports.read_a_ofccc = (req, res)=>{
    ofccc.find({pon:req.params.ponId},(err, pon)=>{
        if(err) res.send(err);
        res.json(pon);
    })
}

exports.read_a_pon = (req, res)=>{
    pon.findById(req.params.ponId,(err, pon)=>{
        if(err) res.send(err);
        res.json(pon);
    }).populate('olt')
}

exports.update_a_pon = (req, res)=>{
    pon.findByIdAndUpdate(
        {_id: req.params.ponId},
        req.body,
        {new:true},
        (err, pon)=>{
            if(err) res.send(err);
            res.json(pon);
        }
    )
}

exports.delete_a_pon = (req, res)=>{
    pon.deleteOne({_id: req.params.ponId}, err =>{
        if (err) res.send(err)
        res.json({
            message: "PON Succesfully Deleted",
            _id: req.params.ponId
        })
    })
}