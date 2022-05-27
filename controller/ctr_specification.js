const Specification = require('../model/specification')

exports.set_specification=async function(req, res){
    try {
        const specification=new Specification(req.body)
        await specification.save()
        res.status(201).send({specification})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_specifications= async function(req, res){
    const specification=Specification.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.update_specification = async (req,res) => {
    var query = {_id:req.params.id},
      options = { upsert: true, setDefaultsOnInsert: true };
    const specification=Specification.findOneAndUpdate(query,req.body, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_specification = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const specification=Specification.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};