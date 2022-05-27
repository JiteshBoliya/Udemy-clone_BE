const req = require("express/lib/request");
const users = require("../model/user");
// const bcrypt= require("bcryptjs")
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

// #Register user
exports.register_User = async function (req, res) {
  try {
    users.count({email:req.body.email},(_err,data)=>{
      if(data==0){
        const register = new users(req.body);
        register.password = cryptr.encrypt(req.body.password);
        register.save();
        res.status(201).send(register);
      }
      else res.status(406).send({error:"Email Id is already Registered..!"})
    })
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

// #Login user
exports.login_user = async (req,res) => {
    users.find({email:req.body.email},(_err,data)=>{
      if([...data].length>0){
        const password = cryptr.decrypt(data[0].password);
        const user=users.findOneAndUpdate({email:req.body.email}, {token:req.body.token},{upsert: true}, function (error, result) {
          if (error) return res.status(404).send({ error: error.message })
          if(password!=req.body.password) return res.status(400).send({ error:"Password is not valid...!" })
          const user = result
          const token = user.genrateAuthToken();
          res.status(201).send(user)
        });
      }
      else res.status(406).send({error:"Email id is Invalid..!"})
    })
};

// #User Detail by id
exports.get_user_byId = async(req,res)=>{
  const Users = users.findOne({_id:req.params.id}, function (err, data) {
      if (err) res.status(400).send({ error: err.message });
      res.status(200).send(data);
    });
}

// #User Detail by token
exports.get_user_byId = async(req,res)=>{
  const Users = users.findOne({token:req.params.token}, function (err, data) {
      if (err) res.status(400).send({ error: err.message });
      res.status(200).send(data);
    });
}