const express = require('express')
const cors=require('cors')
const rt_main=require('./router/mainroute')
require('./db/mongoose')
const app= express()
const port=process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(rt_main)
app.code
app.loginData
app.listen(port,()=> console.log(`Server is listening on ${port}`)) 
// sudo kill -9 `sudo lsof -t -i:3000`