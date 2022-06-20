const express = require('express')
const router = new express.Router()
const auth =require('../middleware/auth')
const ctr_GIT= require('../controller/ctr_getintouch')
const ctr_user= require('../controller/ctr_user')
const ctr_subscriber= require('../controller/ctr_subscriber')
const ctr_publisher= require('../controller/ctr_publisher')
const ctr_course= require('../controller/ctr_course')
const ctr_rating=require('../controller/ctr_rating')
const ctr_catagory= require('../controller/ctr_catagory')
const ctr_specification=require('../controller/ctr_specification')
const ctr_cart=require('../controller/ctr_cart')
const ctr_counter= require('../controller/ctr_counter')
const ctr_tutorial= require('../controller/ctr_tutorial')
const ctr_purchase= require('../controller/ctr_userview')
const ctr_payment=require('../controller/ctr_payment')
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

// #Show limit publishers
router.get('/publisher/some',ctr_publisher.getsome_publishers)

// #Show publishers
router.get('/publisher-limit',ctr_publisher.get_publishers_limit)

// #Show publisher details
router.get('/publisher/:id',ctr_publisher.get_publisher)

router.get('/publisherById/:id',ctr_publisher.get_publisherbyID)

router.get('/publisher/course/:id',ctr_publisher.get_publisherbyCourse)
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


//------------ Course --------------

// #Add course
router.post('/course/AddTutorial',ctr_tutorial.set_Tutorial)

router.post('/course/AddCourse',formdata.none(),ctr_course.set_course)

router.get('/courseList/:publisher',ctr_course.get_courses_byPublisher)

router.get('/tutorialList/:publisher',ctr_tutorial.get_Tutorials_byPublisher)

router.get('/tutorial/:id',ctr_tutorial.get_Tutorials_byCourse)

router.get('/tutorialList/update-Lock/:id/:lock',ctr_tutorial.update_lock)

// #Show course
router.get('/course',ctr_course.get_courses)

// #Show course limit
router.get('/course-limit',ctr_course.get_coursesLimit)

router.get('/course/popular',ctr_course.get_coursesLimit)

// #Show course details
router.get('/course/:id',ctr_course.get_course)

// #Update course
router.post('/course/update/:id',ctr_course.update_course)

// #Delete course
router.post('/course/delete/:id',ctr_course.Delete_course)

router.get('/course/getUser/:id',ctr_purchase.get_courses_userlist)

router.get('/course/purchase/:id',ctr_purchase.get_course_userlist_Limit)
//------------ Rating --------------

// #Add rating
router.post('/rating',ctr_rating.set_rating)

// #Show ratings
router.get('/rating/publisher/:id',ctr_rating.get_rating_publisher)

router.get('/rating/publisher/All/:id',ctr_rating.get_rating_publisherAll)

router.get('/rating/course/:id',ctr_rating.get_rating_course)

router.get('/rating/course/All/:id',ctr_rating.get_rating_courseAll)

// #Show rating details
// router.get('/rating/:id',ctr_rating.get_rating)

// #Update rating
router.post('/rating/update/:id',ctr_rating.update_rating)

// #Delete rating
router.post('/rating/delete/:id',ctr_rating.Delete_rating)


router.get('/publisher/rating/:id',ctr_rating.get_rating_publisherAll)

// #Paggination
router.get('/rating/pagger/:id/:page',ctr_rating.get_Rating_pagger)

// #Sorting
router.get('/rating/sort/:id/:sortby/:sortwith',ctr_rating.get_Ratingbysort)


//------------ Catagory --------------

// #Add catagory
router.post('/catagory',ctr_catagory.set_catagory)

// #Show catagorys
router.get('/catagory',ctr_catagory.get_catagorys)

router.get('/catagory/All',ctr_catagory.get_AllCatagorys)

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

router.post('/invoice',ctr_user.SendInvoice)

//--------------- purchase -------------------
router.post('/purchase',ctr_purchase.set_purchase)

router.get('/purchase/:id',ctr_purchase.get_user_courses)

router.get('/publisherdetails/:id',ctr_publisher.get_publisher)

router.get('/subsciberdetails/:id',ctr_subscriber.get_subscriber)

//---------------- counter ----------------

router.get('/count-subscriber',ctr_counter.count_subscribers)

router.get('/count-publisher',ctr_counter.count_publishers)

router.get('/count-GIT',ctr_counter.count_GIT)

router.get('/course/totalEnroll/:id',ctr_counter.count_enrollcourse)

router.get('/search/:data',ctr_user.Search)

router.get('/count-Course/:id',ctr_counter.count_Publisher_course)

router.get('/count-Course',ctr_counter.count_course)

router.get('/count-sales/:id',ctr_counter.count_enrollcourse)

router.get('/count-sales',ctr_counter.count_purchaseList)

router.get('/count-rating/:id',ctr_purchase.get_AVG_Rating_Course)



//------------------ payment -------------------

module.exports = router