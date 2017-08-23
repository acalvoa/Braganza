/**
 * PRODUCT_TEMPLATEController
 *
 * @description :: Server-side logic for managing PRODUCT_TEMPLATES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var name = req.param('name');
		var fields = req.param('fields');
		PRODUCT_TEMPLATE.create({
			NAME: name,
			FIELDS: fields
		}).exec(function(err,template_obj){
			if(err) return res.serverError(err);
			return res.json(template_obj);
		});
	},
	edit: function(req,res){
		var id = req.param('id');
		var name = req.param('name');
		var fields = req.param('fields');
		PRODUCT_TEMPLATE.findOne({
			ID_PRODUCT_TEMPLATE: id
		}).exec(function(err,template_obj){
			if(err) return res.serverError(err);
			if(template_obj){
				template_obj.NAME = name;
				template_obj.FIELDS = fields;
				template_obj.save(function(err_edit){
					if(err_edit) return res.serverError(err);
					return res.json(template_obj);
				});
			}
			else{
				return res.notFound("No existe el template.");
			}
		});
	}
};

