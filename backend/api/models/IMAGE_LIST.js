/**
 * IMAGE_LIST.js
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
  		MIME:{
  			type: 'string'
  		},
	    toJSON: function () {
	        var obj = this.toObject();
	        delete obj.createdAt;
	        delete obj.updatedAt;
	        return obj;
	    }
  	},
  	autoPK: false,
    tableName: 'IMAGES'
};

