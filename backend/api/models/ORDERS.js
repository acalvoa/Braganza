/**
 * ORDERS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_ORDER: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		PRODUCT:{
  			model: 'PRODUCTS'
  		},
  		SHOWCASE:{
  			model: 'SHOWCASE'
  		},
  		TBK_TRANSACTION:{
  			model: 'TBK_TRANSACTIONS'
  		},
      USER:{
        model: 'USERS'
      }
  	},
  	autoPK: false,
    tableName: 'ORDERS'
};

