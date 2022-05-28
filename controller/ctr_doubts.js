const Doubts = require('../model/doubts')

exports.set_doubts=async function(req, res){
    try {
        const doubts=new Doubts(req.body)
        await doubts.save()
        res.status(201).send({doubts})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_doubtss= async function(req, res){
    const doubts=Doubts.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.get_doubts= async function(req, res){
    const doubts=Doubts.find({_id:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.Delete_doubts = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const doubts=Doubts.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};