const Course = require('../model/course')
const Publisher = require('../model/publisher')
const purchase= require('../model/purachse')

exports.set_publisher=async function(req, res){
    try {
        const publisher=new Publisher(req.body)
        await publisher.save()
        res.status(201).send({publisher})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_publishers= async function(req, res){
    const publisher=Publisher.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate("user","email")
}

exports.getsome_publishers= async function(req, res){
    const publisher=Publisher.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate("user","email").limit(10)
}
exports.get_publishers_limit= async function(req, res){
    const publisher=Publisher.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate("user","email").limit(10)
}
exports.get_publisher= async function(req, res){
    const publisher=Publisher.findOne({_id:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)    
    }).populate("user","email")
}

exports.get_publisherbyID= async function(req, res){
    const publisher=Publisher.findOne({user:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)    
    })
}
exports.get_publisherbyCourse= async function(req, res){
    const course=Course.find({user:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)    
    }).populate("publisher")
}
exports.update_publisher = async (req,res) => {
    var query = {_id:req.params.id},
      options = { upsert: true, setDefaultsOnInsert: true };
    const publisher=Publisher.findOneAndUpdate(query,req.body, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_publisher = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const publisher=Publisher.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.statusChange_publisher = async (req,res) => {
    var query = {_id:req.params.id},
      update = {status:req.params.state},
      options = { upsert: true, setDefaultsOnInsert: true };
    const publisher=Publisher.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.get_Publisher_pagger= async function(req, res){
    Publisher.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate("user","email").skip(req.params.page).limit(10)
}  
exports.get_Publisherbysort= async function(req, res){
    var sortObject = {};
    var stype =req.params.sortby
    if(req.params.sortwith=='Assending') var sortwith=-1
    else var sortwith=1
    sortObject[stype] = sortwith
    const publisher=Publisher.find((err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)   
    }).populate("user","email").sort(sortObject).limit(10)
}
// exports.get_purchase= async function(req, res){
//     const Purachse=purchase.find({isDeleted:false,publisher:req.params.id},(err,data)=>{
//         if (err) res.status(400).send({ error: err.message })
//         res.status(200).send(data)     
//     }).populate('user').populate('course').limit(5)
// }