const GIT = require('../model/getintouch')

exports.set_GIT=async function(req, res){
    try {
        const git=new GIT(req.body)
        await git.save()
        res.status(201).send({git})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_GIT= async function(req, res){
    const git=GIT.find({isDeleted:false},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.update_GIT = async (req,res) => {
    var query = {_id:req.params.id},
      update = {Status:'seen'},
      options = { upsert: true, setDefaultsOnInsert: true };
    const git=GIT.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_GIT = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const git=GIT.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.get_GIT_limit= async function(req, res){
  const git=GIT.find({isDeleted:false},(err,data)=>{
      if (err) res.status(400).send({ error: err.message })
      res.status(200).send(data)     
  }).limit(10)
}
exports.ChangeStatus_GIT = async (req,res) => {
  var query = {_id:req.params.id},
      update = {Status:req.params.state},
      options = { upsert: true, setDefaultsOnInsert: true };
    const git=GIT.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;
    res.status(200).send(result);
  });
}
exports.get_GIT_pagger= async function(req, res){
  GIT.find({isDeleted:false},(err,data)=>{
      if (err) res.status(400).send({ error: err.message })
      res.status(200).send(data)     
  }).skip(req.params.page).limit(10)
}
exports.get_GITbysort= async function(req, res){
  var sortObject = {};
  var stype =req.params.sortby
  if(req.params.sortwith=='Assending'){
      var sortwith=-1
  }
  else{
  var sortwith=1
  }
  sortObject[stype] = sortwith;

  const git=GIT.find({isDeleted:false},(err,data)=>{
      if (err) res.status(400).send({ error: err.message })
      res.status(200).send(data)   
  }).sort(sortObject).limit(10)
}
exports.DeleteGIT = async (req,res) => {
  var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const git=GIT.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;
    res.status(200).send(result);
  });
}