/**
 * CATEGORY_X_PHOTO.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
  		ID_CATEGORY_PHOTO: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		IMAGE:{
  			type: 'integer'
  		},
  		toJSON: function () {
	        var obj = this.toObject();
	        delete ID_CATEGORY_PHOTO;
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
	tableName: 'CATEGORIES_X_PHOTO'
};

