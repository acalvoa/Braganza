/**
 * PRODUCTS_X_PHOTO.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_PHOTO: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		PRODUCT:{
  			model: 'PRODUCTS'
  		},
  		IMAGE:{
  			type: 'integer'
  		},
  		toJSON: function () {
	        var obj = this.toObject();
	        delete obj.PRODUCT;
	        // delete obj.ID_PHOTO;
	        obj.ID_IMAGE = obj.IMAGE;
	        obj.NAME = '';
	        obj.SIZE = '';
	        obj.MIME = '';
	        delete obj.IMAGE;
	        delete obj.createdAt;
	        delete obj.updatedAt;
	        return obj;
	    }
  	},
  	autoPK: false,
    tableName: 'PRODUCTS_X_PHOTO'
};

