const mongoose = require('mongoose');
const ofccc = mongoose.model('ofccc');
const sdp = mongoose.model('sdp');

exports.list_all_ofccc = (req, res)=>{
    ofccc.find({},(err,ofcccs)=>{
        if(err) res.send(err);
        res.json(ofcccs);
    }).populate('pon')
}

exports.create_a_ofccc = (req, res)=>{
    const newOfccc = new ofccc(req.body);
    newOfccc.save((err, ofccc)=>{
        if(err) res.send(err);
        res.json(ofccc);
    })
}

exports.read_a_ofccc = (req, res)=>{
    ofccc.findById(req.params.ofcccId,(err, ofccc)=>{
        if(err) res.send(err);
        res.json(ofccc);
    }).populate('pon')
}

exports.read_a_sdp = (req, res)=>{
    sdp.find({ofccc:req.params.ofcccId},(err, ofccc)=>{
        if(err) res.send(err);
        res.json(ofccc);
    })
}

exports.update_a_ofccc = (req, res)=> {
    ofccc.findByIdAndUpdate(
        {_id: req.params.ofcccId},
        req.body,
        {new: true},
        (err, ofccc)=>{
            if(err) res.send(err);
            res.json(ofccc);
        }
    )
}

exports.delete_a_ofccc = (req, res)=>{
    ofccc.deleteOne({_id: req.params.ofcccId}, err =>{
        if(err) res.send(err);
        res.json({
            message:"ofccc Succesfully Deleted",
            _id: req.params.ofcccId
        })
    })
}