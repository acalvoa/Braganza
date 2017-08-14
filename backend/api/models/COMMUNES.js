/**
 * COMMUNES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_COMMUNE: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		NAME:{
  			type: 'string'
  		},
  		REGION: {
  			model: 'REGIONS'
  		},
  		COMMUNE: {
  			model: 'COMMUNES'
  		}
  	},
  	autoPK: false,
    tableName: 'COMMUNES'
};

