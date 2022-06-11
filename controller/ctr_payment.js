// exports.create = function(req, res, next) {
//     const stripeToken = req.body.stripeToken;
//     const price = Helper.getPrice(req.body.order);
//     const priceInPence = price * 100;
//  stripe.charges.create({
//        amount: priceInPence,
//        currency: 'usd',
//        source: stripeToken,
//        capture: false,  // note that capture: false
//     }).then(response => {
//        // do something in success here
//     }).catch(error => {
//        // do something in error here
//     });
//  };