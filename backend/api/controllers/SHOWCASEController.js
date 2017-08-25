/**
 * SHOWCASEController
 *
 * @description :: Server-side logic for managing SHOWCASES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var product = req.param('product');
		var price = req.param('price');
		var stock = req.param('stock');
		var discount = req.param('discount');
		var publish_date = req.param('publish_date');
		SHOWCASE.create({
			PRODUCT: product,
			PRICE: price,
			STOCK: stock,
			DISCOUNT: discount,
			PUBLISH_DATE: publish_date
		}).exec(function(err,showcase){
			if(err) return res.serverError(err);
			PRODUCT.findOne({
				ID_PRODUCT: product
			}).exec(function(err_prod, product){
				if(err_prod) return res.serverError(err_prod);
				product.STOCK = product.STOCK - showcase.STOCK;
				product.save(function(err_save){
					if(err_save) return res.serverError(err_save);
					return res.json(product);
				});
			});
		});
	},
	edit: function(req,res){
		var id = req.param('id');
		var product = req.param('product');
		var price = req.param('price');
		var stock = req.param('stock');
		var discount = req.param('discount');
		var publish_date = req.param('publish_date');
		SHOWCASE.findOne({
			ID_SHOWCASE: id
		}).exec(function(err,showcase_obj){
			if(err) return res.serverError(err);
			showcase_obj.PRODUCT = product;
			showcase_obj.PRICE = price;
			showcase_obj.STOCK = stock;
			showcase_obj.DISCOUNT = discount;
			showcase_obj.PUBLISH_DATE = publish_date;
			showcase_obj.save(function(err_save){
				if(err_save) return res.serverError(err_save);
				return res.json(showcase_obj);
			});
		});
	},
	destroy: function(req,res){
		var id = req.param('id');
		SHOWCASE.destroy({
			ID_PRODUCT: id
		}).exec(function(err,showcase_obj){
			if(err) return res.serverError(err);
			res.json(showcase_obj);
		});
	}
};
