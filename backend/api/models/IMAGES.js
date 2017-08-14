/**
 * IMAGES.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_IMAGE: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		DATA:{
  			type: 'ref',
      		columnType: 'mediumblob'
  		},
  		MIME:{
  			type: 'string'
  		}
  	},
  	autoPK: false,
    tableName: 'IMAGES'
};

