const Publisher = require('../model/publisher')
const Subscriber = require('../model/subscriber')
const GIT= require('../model/getintouch')

exports.count_subscribers= async function(req, res){
    const subscriber=Subscriber.count({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}
exports.count_publishers= async function(req, res){
    const publisher=Publisher.count({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}
exports.count_GIT= async function(req, res){
    const git=GIT.count({},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}