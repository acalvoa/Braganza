/**
 * CITIES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_CITY: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		NAME: {
  			type: 'string'
  		},
  		REGION: {
  			model: 'REGIONS'
  		}
  	},
  	autoPK: false,
    tableName: 'CITIES'
};

