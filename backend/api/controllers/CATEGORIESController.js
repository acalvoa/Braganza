/**
 * CATEGORIESController
 *
 * @description :: Server-side logic for managing CATEGORIES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var name = req.param('name');
		var image = req.param('image');
		var description = req.param('description');
		CATEGORIES_X_PHOTO.create({
			IMAGE: image
		}).exec(function(err,image_obj){
			if(err) res.serverError(err);
			CATEGORIES.create({
				NAME: name,
	  			DESCRIPTION: description,
	  			IMAGE: image_obj.ID_CATEGORY_PHOTO
			}).exec(function(err,category){
				if(err) res.serverError(err);
				var img = {
					ID_IMAGE: image_obj.IMAGE,
					NAME: '',
					SIZE: '',
					MIME: ''
				};
				category.IMAGE = img;
				res.json(category);
			});
		});
		
	},
	edit: function(req,res){
		var name = req.param('name');
		var image = req.param('image');
		var description = req.param('description');
		var id = req.param('id');
		CATEGORIES.findOne({
			ID_CATEGORY: id
		}).exec(function(err,category_obj){
			if(err) res.serverError(err);
			if(image != category_obj.IMAGE){
				CATEGORIES_X_PHOTO.destroy({
					ID_CATEGORY_PHOTO: category_obj.IMAGE
				}).exec(function(err_img){
					if(err_img) res.serverError(err_img);
					CATEGORIES_X_PHOTO.create({
						IMAGE: image
					}).exec(function(err_cat,image_obj){
						if(err_cat) res.serverError(err_cat);
						category_obj.NAME = name;
						category_obj.IMAGE = image_obj.ID_CATEGORY_PHOTO;
						category_obj.DESCRIPTION = description;
						category_obj.save(function(err_save){
							if(err_save) res.serverError(err_save);
							res.json(image_obj);
						})
					});
				});
			}
			else{
				category_obj.NAME = name;
				category_obj.DESCRIPTION = description;
				category_obj.save(function(err_save){
					if(err_save) res.serverError(err_save);
					res.json(image_obj);
				})
			}
		});
	}
};

