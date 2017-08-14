/**
 * ADMINS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	attributes: {
  		ID_ADMIN: {
  			type: 'integer',
	  		primaryKey: true,
	  		autoIncrement: true
  		},
  		NAME: {
  			type: 'string'
  		},
  		EMAIL: {
  			type: 'email',
  			unique: true
  		},
  		PASSWORD: {
  			type: 'string'
  		},
  		NAME: {
  			type: 'string'
  		},
  		ROLE: {
  			model: 'ROLES'
  		}
  	},
  	autoPK: false,
    tableName: 'ADMINS'
};

