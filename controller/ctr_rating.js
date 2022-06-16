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
exports.get_rating_publisher= async function(req, res){
    const rating=Rating.find({isDeleted:false,publisher:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('user').populate('publisher').populate('course').limit(5)
}
exports.get_rating_publisherAll= async function(req, res){
    const rating=Rating.find({isDeleted:false,publisher:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('user').populate('publisher').populate('course')
}

exports.get_rating_course= async function(req, res){
    const rating=Rating.find({isDeleted:false,course:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('user').populate('course').limit(5)
}

exports.get_rating_courseAll= async function(req, res){
    const rating=Rating.find({isDeleted:false,course:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('user').populate('course')
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
exports.get_Rating_pagger= async function(req, res){
    Rating.find({publisher:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    }).populate('user').populate('publisher').populate('course').skip(req.params.page).limit(5)
}  
exports.get_Ratingbysort= async function(req, res){
    var sortObject = {};
    var stype =req.params.sortby
    if(req.params.sortwith=='Assending') var sortwith=-1
    else var sortwith=1
    sortObject[stype] = sortwith
    const rating=Rating.find({publisher:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)   
    }).populate('user').populate('publisher').populate('course').sort(sortObject).limit(5)
}