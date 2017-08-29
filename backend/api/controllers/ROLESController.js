/**
 * ROLESController
 *
 * @description :: Server-side logic for managing ROLES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var name = req.param('name');
		var permisions = req.param('permisions');
		ROLES.create({
			NAME: name,
			PERMISIONS: permisions
		}).exec(function(err,rol){
			if(err) return res.serverError(err);
			return res.json(rol);
		});
	},
	edit: function(req,res){
		var id = req.param('id');
		var name = req.param('name');
		var permisions = req.param('permisions');
		ROLES.findOne({
			ID_ROLE: id
		}).exec(function(err,role){
			if(err) return res.serverError(err);
			role.NAME = name;
			role.PERMISIONS = permisions;
			role.save(function(err_save){
				if(err_save) return res.serverError(err_save);
				return res.json(role);
			});
		});
	},
	destroy: function(req,res){
		var id = req.param('id');
		ROLES.destroy({
			ID_ROLE: id
		}).exec(function(err,role){
			if(err) return res.serverError(err);
			res.json(role);
		});
	}
};

