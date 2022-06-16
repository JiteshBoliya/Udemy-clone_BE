const Publisher = require('../model/publisher')
const Subscriber = require('../model/subscriber')
const GIT= require('../model/getintouch')
const Course = require('../model/course')
const Purchase = require('../model/purachse')

exports.count_subscribers= async function(req, res){
    const subscriber=Subscriber.count({},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}
exports.count_publishers= async function(req, res){
    const publisher=Publisher.count({},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}
exports.count_GIT= async function(req, res){
    const git=GIT.count({},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
         res.status(200).send({data})     
    })
}
exports.count_enrollcourse= async function(req, res){
    const course=Purchase.count({user:req.params.id},(err,data)=>{
        if (err) return res.status(400).send({ error: err.message })
         res.status(200).send({data})  
    })
}
exports.count_Publisher_course= async function(req, res){
    const course=Course.count({publisher:req.params.id},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}
exports.count_course= async function(req, res){
    const course=Course.count({},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    })
}
exports.count_purchaseList= async function(req, res){
    const sales=Purchase.find({},(err,data)=>{
        if (err)return res.status(400).send({ error: err.message })
        res.status(200).send({data})     
    }).populate('course')
}