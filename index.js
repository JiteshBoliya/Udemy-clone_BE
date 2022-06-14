const express = require('express')
const cors=require('cors')
const rt_main=require('./router/mainroute') 
require('./db/mongoose')
const stripe = require("stripe")("sk_test_51LATrFSE5OvXZYoNFXd4cnjFCRuGbGsKtj3soMNTVVqTkCiHCL3lIVqanLc2q8fv92eid8KmbmbGMYZyrBL478ba00LvJVubsJ");
const app= express()
const port=process.env.PORT || 3000
// const stripe = require('stripe')('SECRET_KEY');
app.use(express.json())
app.use(cors())
app.use(rt_main)
app.code
app.post('/checkout', async(req, res) => {
    try {
        console.log(req.body);
        token = req.body.token
      const customer = stripe.customers
        .create({
          email: req.body.email,
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
          return stripe.charges.create({
            amount: 1000,
            description: "Test Purchase using express and Node",
            currency: "INR",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }
})
app.loginData
app.listen(port,()=> console.log(`Server is listening on ${port}`)) 
// sudo kill -9 `sudo lsof -t -i:3000`