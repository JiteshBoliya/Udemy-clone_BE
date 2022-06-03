const Course = require('../model/course')

exports.set_course=async function(req, res){
    try {
        const course=new Course(req.body)
        await course.save()
        res.status(201).send({course})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_courses= async function(req, res){
    const course=Course.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.get_coursesLimit= async function(req, res){
    const course=Course.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).limit(3)
}
exports.get_course= async function(req, res){
    const course=Course.find({_id:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.update_course = async (req,res) => {
    var query = {_id:req.params.id},
      options = { upsert: true, setDefaultsOnInsert: true };
    const course=Course.findOneAndUpdate(query,req.body, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_course = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const course=Course.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};





