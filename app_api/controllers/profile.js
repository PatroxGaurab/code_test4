var mongoose = require('mongoose');
var User = mongoose.model('User');
var discourse_sso = require('discourse-sso');
var sso = new discourse_sso("MY_SECRET");

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
	//res.redirect('http://www.google.com');
        //res.status(200).send({redirect_to: 'http://www.google.com'});
	var sso_payload = req.query.sso; // fetch from incoming request 
	var sig = req.query.sig; // fetch from incoming request 
	var redirect_to_url = 'http://54.169.85.240/session/sso_login?';
	//if(sso.validate(sso_payload, sig)) {
		var nonce = sso.getNonce(sso_payload);
		var userparams = {
			// Required, will throw exception otherwise 
			"nonce": nonce,
			"external_id": user._id,
			"email": user.email,
			// Optional 
			//"username": "Pat",
			//"name": "Gaurab Patra"
		};
		var q = sso.buildLoginString(userparams);
		res.status(200).json({redirect_to: redirect_to_url+q});
	//}
	//res.status(200).json({redirect_to: sig});
      });
  }

};
