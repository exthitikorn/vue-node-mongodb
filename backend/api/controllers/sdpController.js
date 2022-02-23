const mongoose = require('mongoose');
const sdp = mongoose.model('sdp');
const customer = mongoose.model('customer')

exports.list_all_sdp = (req, res)=>{
    sdp.find({},(err,sdps)=>{
        if(err) res.send(err);
        res.json(sdps);
    }).populate('ofccc')
}

exports.create_a_sdp = (req, res)=>{
    const newSdp = new sdp(req.body);
    newSdp.save((err, sdp)=>{
        if(err) res.send(err);
        res.json(sdp);
    })
}

exports.read_a_sdp = (req, res)=>{
    sdp.findById(req.params.sdpId,(err, sdp)=>{
        if(err) res.send(err);
        res.json(sdp);
    }).populate('ofccc')
}

exports.read_a_customer = (req, res)=>{
    customer.find({sdp:req.params.sdpId},(err, sdp)=>{
        if(err) res.send(err);
        res.json(sdp);
    })
}

exports.update_a_sdp = (req, res)=> {
    sdp.findByIdAndUpdate(
        {_id: req.params.sdpId},
        req.body,
        {new: true},
        (err, sdp)=>{
            if(err) res.send(err);
            res.json(sdp);
        }
    )
}

exports.delete_a_sdp = (req, res)=>{
    sdp.deleteOne({_id: req.params.sdpId}, err =>{
        if(err) res.send(err);
        res.json({
            message:"sdp Succesfully Deleted",
            _id: req.params.sdpId
        })
    })
}