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
		}).populateAll().exec(function(err,admin){
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
		var name = req.param('name');
		var lastname = req.param('lastname');
		var email = req.param('email');
		var password = req.param('password');
		var role = req.param('role');
		ADMINS.create({
			NAME: name,
			LASTNAME: lastname,
			EMAIL: email,
			PASSWORD: password,
			ROLE: role
		}).exec(function(err,admin){
			if(err) return res.serverError(err);
			return res.json(admin);
		});
	},
	edit: function(req,res){
		var id = req.param('id');
		var name = req.param('name');
		var lastname = req.param('lastname');
		var email = req.param('email');
		var role = req.param('role');
		ADMINS.findOne({
			ID_ADMIN: id
		}).exec(function(err,admin_obj){
			if(err) return res.serverError(err);
			admin_obj.NAME = name;
			admin_obj.LASTNAME = lastname;
			admin_obj.EMAIL = email;
			admin_obj.ROLE = role;
			admin_obj.save(function(err_save){
				if(err_save) return res.serverError(err_save);
				return res.json(admin_obj);
			});
		});
	},
	destroy: function(req,res){
		var id = req.param('id');
		ADMINS.destroy({
			ID_ADMIN: id
		}).exec(function(err,admin_obj){
			if(err) return res.serverError(err);
			res.json(admin_obj);
		});
	}
};

