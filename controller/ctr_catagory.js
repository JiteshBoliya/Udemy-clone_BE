const Catagory = require('../model/catagory')

exports.set_catagory=async function(req, res){
    try {
        const catagory=new Catagory(req.body)
        await catagory.save()
        res.status(201).send({catagory})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_catagorys= async function(req, res){
    const catagory=Catagory.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).limit(5)
}
exports.get_AllCatagorys= async function(req, res){
  const catagory=Catagory.find({},(err,data)=>{
      if (err) res.status(400).send({ error: err.message })
      res.status(200).send(data)     
  })
}
exports.update_catagory = async (req,res) => {
    var query = {_id:req.params.id},
      options = { upsert: true, setDefaultsOnInsert: true };
    const catagory=Catagory.findOneAndUpdate(query,req.body, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_catagory = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const catagory=Catagory.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};