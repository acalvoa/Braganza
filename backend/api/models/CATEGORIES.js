/**
 * CATEGORIES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
  		ID_CATEGORY: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		NAME: {
  			type: 'string'
  		},
  		DESCRIPTION:{
  			type: 'text'
  		},
      IMAGE:{
        model: 'CATEGORIES_X_PHOTO'
      },
  		PRODUCTS:{
  			model: 'PRODUCTS'
  		},
      toJSON: function () {
          var obj = this.toObject();
          delete obj.createdAt;
          delete obj.updatedAt;
          return obj;
      }
  	},
  	autoPK: false,
    tableName: 'CATEGORIES'
};