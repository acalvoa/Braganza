/**
 * TBK_TRANSACTIONS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_TBK: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		}
	},
  	autoPK: false,
    tableName: 'TBK_TRANSACTIONS'
};

