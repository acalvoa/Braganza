/**
 * ADMINSController
 *
 * @description :: Server-side logic for managing ADMINS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	me: function(req,res){
		if(req.session.authenticated){
			return res.json({
				RESPONSE: 200,
				USER: req.session.user
			});
		}
		else
		{
			return res.json({
				RESPONSE: 404
			});
		}
	},
	login: function(req,res){
		var user = req.param('user');
		var password = req.param('password');
		ADMINS.findOne({
			EMAIL: user
		}).exec(function(err,admin){
			if(err) return res.serverError({
				RESPONSE: 500,
				ERROR: err
			});
			//EN CASO CONTRARIO
			if(admin){
				admin.auth(password, function(result){
					if(result){
						req.session.admin = true;
	            		req.session.authenticated = true;
	            		req.session.user = admin;
						return res.json({
							RESPONSE: 200,
							USER: admin
						});
					}
					else{
						return res.json({
							RESPONSE: 510
						});
					}
				});
			}
			else
			{
				return res.json({
					RESPONSE: 404
				});
			}
		});
	},
	changePassword: function(req,res){

	},
	create: function(req,res){

	},
	edit: function(req,res){

	},
	destroy: function(req,res){
		
	}
};

