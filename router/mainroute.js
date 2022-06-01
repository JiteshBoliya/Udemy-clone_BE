const express = require('express')
const router = new express.Router()
const auth =require('../middleware/auth')
const ctr_GIT= require('../controller/ctr_getintouch')
const ctr_user= require('../controller/ctr_user')
const ctr_subscriber= require('../controller/ctr_subscriber')
const ctr_publisher= require('../controller/ctr_publisher')
const ctr_rating=require('../controller/ctr_rating')
const ctr_catagory= require('../controller/ctr_catagory')
const ctr_specification=require('../controller/ctr_specification')
const ctr_cart=require('../controller/ctr_cart')
const ctr_counter= require('../controller/ctr_counter')
const multer = require('multer')
const formdata = multer()

//------------ Signin/signup --------------
 
// #Register User
router.post('/register',formdata.none(),ctr_user.validEmail)

// #Login User
router.post('/login',formdata.none(),ctr_user.login_user)

// #valid User
router.post('/varify-email',formdata.none(),ctr_user.register_User)

// #valid User
router.post('/forgetpassword',formdata.none(),ctr_user.forgetPassword)

// #User details
router.get('/userDetail/:id',ctr_user.get_user_byId)

// #User details
router.post('/resetpassword/:id',formdata.none(),ctr_user.resetpassword)
//---------------- GIT ------------------

// #Add Get In Touch
router.post('/GIT',formdata.none(),ctr_GIT.set_GIT)

// #Show Get In Touch
router.get('/GIT',ctr_GIT.get_GIT)

// #Show Get In Touch
router.get('/GIT-limit',ctr_GIT.get_GIT_limit)

// #Show Get In Touch
router.get('/GIT/status/:id/:state',ctr_GIT.ChangeStatus_GIT)

// #Update Get In Touch
router.post('/GIT/update/:id',ctr_GIT.update_GIT)

// #Delete Get In Touch
router.post('/GIT/delete/:id',ctr_GIT.Delete_GIT)

// #Paggination
router.get('/GIT/pagger/:page',ctr_GIT.get_GIT_pagger)

// #Sorting
router.get('/GIT/sort/:sortby/:sortwith',ctr_GIT.get_GITbysort)

// #Delete
router.get('/GIT/delete/:id',ctr_GIT.DeleteGIT)

//------------ Subscriber --------------

// #Add Subscriber
router.post('/subscriber',ctr_subscriber.set_subscriber)

// #Show Subscribers
router.get('/subscriber',ctr_subscriber.get_subscribers)

// #Show Subscribers limit
router.get('/subscriber-limit',ctr_subscriber.get_subscriber_limit)

// #Show Subscriber details
router.get('/subscriber/:id',ctr_subscriber.get_subscriber)

// #Update Subscriber
router.post('/subscriber/update/:id',formdata.none(),ctr_subscriber.update_subscriber)

// #Delete Subscriber
router.post('/subscriber/delete/:id',ctr_subscriber.Delete_subscriber)


//------------ Publisher --------------

// #Add publisher
router.post('/publisher',ctr_publisher.set_publisher)

// #Show publishers
router.get('/publisher',ctr_publisher.get_publishers)

// #Show publishers
router.get('/publisher-limit',ctr_publisher.get_publishers_limit)

// #Show publisher details
router.get('/publisher/:id',ctr_publisher.get_publisher)

// #Update publisher
router.post('/publisher/update/:id',ctr_publisher.update_publisher)

// #Delete publisher
router.post('/publisher/delete/:id',ctr_publisher.Delete_publisher)

// #Paggination
router.get('/publisher/pagger/:page',ctr_publisher.get_Publisher_pagger)

// #Sorting
router.get('/publisher/sort/:sortby/:sortwith',ctr_publisher.get_Publisherbysort)

// #Update status
router.get('/publisher/statusChange/:id/:state',ctr_publisher.statusChange_publisher)

//------------ Rating --------------

// #Add rating
router.post('/rating',ctr_rating.set_rating)

// #Show ratings
router.get('/rating',ctr_rating.get_ratings)

// #Show rating details
router.get('/rating/:id',ctr_rating.get_rating)

// #Update rating
router.post('/rating/update/:id',ctr_rating.update_rating)

// #Delete rating
router.post('/rating/delete/:id',ctr_rating.Delete_rating)

//------------ Catagory --------------

// #Add catagory
router.post('/catagory',ctr_catagory.set_catagory)

// #Show catagorys
router.get('/catagory',ctr_catagory.get_catagorys)

// #Update catagory
router.post('/catagory/update/:id',ctr_catagory.update_catagory)

// #Delete catagory
router.post('/catagory/delete/:id',ctr_catagory.Delete_catagory)

//------------ Specification --------------

// #Add specification
router.post('/specification',ctr_specification.set_specification)

// #Show specification
router.get('/specification',ctr_specification.get_specifications)

// #Update specification
router.post('/specification/update/:id',ctr_specification.update_specification)

// #Delete specification
router.post('/specification/delete/:id',ctr_specification.Delete_specification)

//------------ Cart --------------

// #Add cart
router.post('/cart',ctr_cart.set_cart)

// #Show cart details
router.get('/cart/:id',ctr_cart.get_cart)

// #Delete cart
router.post('/cart/delete/:id',ctr_cart.Delete_cart)


//---------------- counter ----------------

router.get('/count-subscriber',ctr_counter.count_subscribers)

router.get('/count-publisher',ctr_counter.count_publishers)

router.get('/count-GIT',ctr_counter.count_GIT)

module.exports = router