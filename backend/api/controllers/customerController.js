const mongoose = require("mongoose");
const cus = mongoose.model("customer");

exports.list_all_cus = (req, res) => {
  cus
    .find({}, (err, cuss) => {
      if (err) res.send(err);
      res.json(cuss);
    })
    // .populate('sdp')
    // .populate({
    //   path: "sdp",
    //   populate: {
    //     path: "ofccc",
    //     populate: {
    //       path: "pon",
    //       populate: {
    //         path: "olt",
    //       },
    //     },
    //   },
    // });
};

exports.create_a_cus = (req, res) => {
  const newCus = new cus(req.body);
  newCus.save((err, cus) => {
    if (err) res.send(err);
    res.json(cus);
  });
};

exports.read_a_cus = (req, res) => {
  cus
    .findById(req.params.cusId, (err, cus) => {
      if (err) res.send(err);
      res.json(cus);
    })
    .populate("sdp");
};

exports.update_a_cus = (req, res) => {
  cus.findByIdAndUpdate(
    { _id: req.params.cusId },
    req.body,
    { new: true },
    (err, cus) => {
      if (err) res.send(err);
      res.json(cus);
    }
  );
};

exports.delete_a_cus = (req, res) => {
  cus.deleteOne({ _id: req.params.cusId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "Customer Succesfully Deleted",
      _id: req.params.cusId,
    });
  });
};
