const Rating = require('../model/rating')

exports.set_rating=async function(req, res){
    try {
        const rating=new Rating(req.body)
        await rating.save()
        res.status(201).send({rating})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_ratings= async function(req, res){
    const rating=Rating.find({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.get_rating= async function(req, res){
    const rating=Rating.find({course:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.update_rating = async (req,res) => {
    var query = {_id:req.params.id},
      options = { upsert: true, setDefaultsOnInsert: true };
    const rating=Rating.findOneAndUpdate(query,req.body, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};
exports.Delete_rating = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const rating=Rating.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};