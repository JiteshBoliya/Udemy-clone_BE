const Subscriber = require('../model/subscriber')

exports.set_subscriber=async function(req, res){
    try {
        const subscriber=new Subscriber(req.body)
        await subscriber.save()
        res.status(201).send({subscriber})        
    } catch (error) {
        return res.status(404).send({error: error.message})
    }
}
exports.get_subscribers= async function(req, res){
    const subscriber=Subscriber.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.get_subscriber_limit= async function(req, res){
    const subscriber=Subscriber.find({},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate("user","email").limit(10)
}
exports.get_subscriber= async function(req, res){
    const subscriber=Subscriber.findOne({user:req.params.id},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('user','email')
}
exports.update_subscriber = async (req,res) => {
    try{
        var obj=req.body;
    var query = {_id:req.params.id},
    update = {obj},

      options = { upsert: true, setDefaultsOnInsert: true };
    const subscriber=Subscriber.findOneAndUpdate(query,update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
    }catch(e){
    }
};
exports.Delete_subscriber = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const subscriber=Subscriber.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
