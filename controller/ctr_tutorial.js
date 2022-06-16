const Tutorials = require('../model/curriculam')

exports.set_Tutorial=async function(req, res){
    try {
        const Tutorial=new Tutorials(req.body)
        await Tutorial.save()
        res.status(201).send(Tutorial)        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_Tutorials_byCourse= async function(req, res){
    const Tutorial=Tutorials.find({course:req.params.id,isDeleted:false},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('course')
}
exports.get_Tutorials= async function(req, res){
    const Tutorial=Tutorials.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.update_lock = async (req,res) => {
    let newlock_value= !req.params.lock
    var query = {_id:req.params.id},
      update = {'video.lock':newlock_value},
      options = { upsert: true, setDefaultsOnInsert: true };
    const Tutorial=Tutorials.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.get_Tutorials_byPublisher= async function(req, res){
    const Tutorial=Tutorials.find({publisher:req.params.publisher,isDeleted:false},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('course')
}
exports.get_TutorialsLimit= async function(req, res){
    const Tutorial=Tutorials.find({publisher:req.params.publisher,isDeleted:false},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('course').limit(10)
}
exports.get_Tutorial= async function(req, res){
    const Tutorial=Tutorials.find({_id:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.update_Tutorial = async (req,res) => {
    var query = {_id:req.params.id},
      options = { upsert: true, setDefaultsOnInsert: true };
    const Tutorial=Tutorials.findOneAndUpdate(query,req.body, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_Tutorial = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const Tutorial=Tutorials.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};





