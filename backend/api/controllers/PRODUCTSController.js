/**
 * PRODUCTSController
 *
 * @description :: Server-side logic for managing PRODUCTS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var name = req.param('name');
		var images = JSON.parse(req.param('images'));
		var categories = JSON.parse(req.param('categories'));
		/* LIMPIAMOS LAS  CATEGORIAS */
		var category_list = [];
		for(i=0;i<categories.length;i++){
			category_list.push(categories[i].ID_CATEGORY);
		}  
		var template = req.param('template');
		var fields = req.param('fields');
		var description = req.param('description');
		PRODUCTS.create({
			NAME: name,
			CATEGORIES: category_list,
			DESCRIPTION: description,
			FIELDS: fields,
			TEMPLATE: template
		}).exec(function(err,product){
			if(err) return res.serverError(err);
			var image_list = [];
			for(i=0;i<images.length;i++){
				image_list.push({
					IMAGE: images[i].ID_IMAGE,
					PRODUCT: product.ID_PRODUCT
				});
			}  
			PRODUCTS_X_PHOTO.create(image_list).exec(function(err_img,image_obj){
				console.log(image_obj);
				if(err_img) return res.serverError(err_img);
				product.IMAGES = JSON.parse(JSON.stringify(image_obj));
				return res.json(product);
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
			if(err) return res.serverError(err);
			if(image != category_obj.IMAGE){
				CATEGORIES_X_PHOTO.destroy({
					ID_CATEGORY_PHOTO: category_obj.IMAGE
				}).exec(function(err_img){
					if(err_img) return res.serverError(err_img);
					CATEGORIES_X_PHOTO.create({
						IMAGE: image
					}).exec(function(err_cat,image_obj){
						if(err_cat) return res.serverError(err_cat);
						category_obj.NAME = name;
						category_obj.IMAGE = image_obj.ID_CATEGORY_PHOTO;
						category_obj.DESCRIPTION = description;
						category_obj.save(function(err_save){
							if(err_save) return res.serverError(err_save);
							return res.json(image_obj);
						})
					});
				});
			}
			else{
				category_obj.NAME = name;
				category_obj.DESCRIPTION = description;
				category_obj.save(function(err_save){
					if(err_save) return res.serverError(err_save);
					return res.json(image_obj);
				})
			}
		});
	}
};

