/**
 * SHOWCASE.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_SHOWCASE: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		PRODUCT:{
  			model: 'PRODUCTS'
  		},
  		PRICE:{
  			type: 'integer'
  		},
  		DISCOUNT:{
  			type: 'integer'
  		}
  	},
  	autoPK: false,
    tableName: 'SHOWCASE'
};

