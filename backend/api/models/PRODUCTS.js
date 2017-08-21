/**
 * PRODUCTS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_PRODUCT: {
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
  		CATEGORIES: {
  			collection: 'CATEGORIES',
  			via: 'PRODUCTS'
  		}
  	},
  	autoPK: false,
    tableName: 'PRODUCTS'
};

