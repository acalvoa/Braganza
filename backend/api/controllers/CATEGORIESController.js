/**
 * CATEGORIESController
 *
 * @description :: Server-side logic for managing CATEGORIES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		var name = req.param('name');
		console.log(name);
		var image = req.param('image');
		var description = req.param('description');
		console.log(description);
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
				res.json(category);
			});
		});
		
	}
};

