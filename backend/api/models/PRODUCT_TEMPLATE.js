/**
 * PRODUCT_TEMPLATE.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
  		ID_PRODUCT_TEMPLATE: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		NAME: {
  			type: 'string'
  		},
  		FIELDS:{
  			type: 'json'
  		}
  	},
  	autoPK: false,
    tableName: 'PRODUCT_TEMPLATE'
};

