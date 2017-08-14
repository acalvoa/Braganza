/**
 * USERS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_USER: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		EMAIL: {
  			type: 'email',
  			unique: true
  		},
  		PASSWORD: {
  			type: 'string'
  		},
  		TOKEN: {
  			type: 'string'
  		},
  		FACEBOOK: {
  			type: 'string'
  		},
  		GOOGLE: {
  			type: 'string'
  		}
  	},
  	autoPK: false,
    tableName: 'USERS'
};

