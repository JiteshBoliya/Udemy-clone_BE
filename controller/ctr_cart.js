const Cart = require('../model/cart')

exports.set_cart=async function(req, res){
    try {
        const cart=new Cart(req.body)
        await cart.save()
        res.status(201).send({cart})        
    } catch (error) {
        res.status(404).send({error: error.message})
    }
}
exports.get_cart= async function(req, res){
    const cart=Cart.find({subscriber:req.params.id},(err,data)=>{
        if (err) res.status(400).send({ error: err.message })
        res.status(200).send(data)     
    })
}
exports.Delete_cart = async (req,res) => {
    var query = {_id:req.params.id},
      update = {isDeleted:true},
      options = { upsert: true, setDefaultsOnInsert: true };
    const cart=Cart.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;
      res.status(200).send(result);
    });
};