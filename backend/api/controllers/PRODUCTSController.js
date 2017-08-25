/**
 * PRODUCTSController
 *
 * @description :: Server-side logic for managing PRODUCTS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var name = req.param('name');
		var stock = req.param('stock');
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
			STOCK:stock,
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
				if(err_img) return res.serverError(err_img);
				var image_response = [];
				for(i=0;i<image_obj.length;i++){
					image_response.push({
						ID_IMAGE:image_obj[i].IMAGE,
				        NAME:'',		
				        SIZE:'',
				        MIME:''
					});
				}
				var response = JSON.parse(JSON.stringify(product));
				response.IMAGES = image_response;
				return res.json(response);
			});
		});
	},
	edit: function(req,res){
		var name = req.param('name');
		var stock = req.param('stock');
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
		var id = req.param('id');
		PRODUCTS.findOne({
			ID_PRODUCT: id
		}).populate('IMAGES').exec(function(err,product_obj){
			if(err) return res.serverError(err);
			//CORROBORAMOS LA IMAGENES QUE YA NO EIXSTEN
			var image_destroy = [];
			var image_list = images;
			for(i=0;i<product_obj.IMAGES.length;i++){
				if(images.indexOf(product_obj.IMAGES[i].ID_IMAGE) == -1){
					image_destroy.push(product_obj.IMAGES[i].ID_PHOTO);
				}
				else{
					image_list.splice(image_list.indexOf(product_obj.IMAGES[i].ID_IMAGE),1);
				}
			}
			var image_list_add = [];
			for(i=0;i<image_list.length;i++){
				image_list_add.push({
					IMAGE: image_list[i],
					PRODUCT: product_obj.ID_PRODUCT
				});
			}  
			if(image_destroy.length > 0){
				PRODUCTS_X_PHOTO.destroy(image_destroy).exec(function(err_img){
					if(err_img) return res.serverError(err_img);
					if(image_list_add.length > 0){
						PRODUCTS_X_PHOTO.create(image_list_add).exec(function(err_img2,image_obj){
						if(err_img2) return res.serverError(err_img2);
						product_obj.NAME = name;
						product_obj.CATEGORIES = category_list;
						product_obj.DESCRIPTION = description;
						product_obj.STOCK = stock;
						product_obj.IMAGES = image_obj;
						product_obj.FIELDS = fields;
						product_obj.TEMPLATE = template;
						product_obj.save(function(err_save){
							if(err_save) return res.serverError(err_save);
								return res.json(product_obj);
							});
						});
					}
					else{
						product_obj.NAME = name;
						product_obj.CATEGORIES = category_list;
						product_obj.DESCRIPTION = description;
						product_obj.STOCK = stock;
						product_obj.FIELDS = fields;
						product_obj.TEMPLATE = template;
						product_obj.save(function(err_save){
							if(err_save) return res.serverError(err_save);
							return res.json(product_obj);
						});
					}				
				});
			}
			else{
				if(image_list_add.length > 0){
					PRODUCTS_X_PHOTO.create(image_list_add).exec(function(err_img2,image_obj){
						if(err_img2) return res.serverError(err_img2);
						product_obj.NAME = name;
						product_obj.CATEGORIES = category_list;
						product_obj.DESCRIPTION = description;
						product_obj.STOCK = stock;
						product_obj.IMAGES = image_obj;
						product_obj.FIELDS = fields;
						product_obj.TEMPLATE = template;
						product_obj.save(function(err_save){
							if(err_save) return res.serverError(err_save);
							return res.json(product_obj);
						});
					});
				}
				else{
					product_obj.NAME = name;
					product_obj.CATEGORIES = category_list;
					product_obj.DESCRIPTION = description;
					product_obj.STOCK = stock;
					product_obj.FIELDS = fields;
					product_obj.TEMPLATE = template;
					product_obj.save(function(err_save){
						if(err_save) return res.serverError(err_save);
						return res.json(product_obj);
					});
				}
			}
		});
	},
	destroy: function(req,res){
		var id = req.param('id');
		PRODUCTS.findOne({
			ID_PRODUCT: id
		}).populate('IMAGES').exec(function(err,product_obj){
			if(err) return res.serverError(err);
			PRODUCTS_X_PHOTO.destroy(product_obj).exec(function(err_img){
				if(err_img) return res.serverError(err_img);
				PRODUCTS.destroy({
					ID_PRODUCT: id
				}).exec(function(err_op,del){
					if(err_op) return res.serverError(err_op);
					res.json(del);
				})
			})
		});
	}
};

