const Publisher = require('../model/publisher')

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
    })
}
exports.get_publisher= async function(req, res){
    const publisher=Publisher.find({_id:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
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