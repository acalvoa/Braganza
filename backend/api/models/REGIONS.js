/**
 * REGION.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_REGION: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		NAME:{
  			type: 'string'
  		}
  	},
  	autoPK: false,
    tableName: 'REGION'
};

