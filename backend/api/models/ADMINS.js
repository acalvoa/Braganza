/**
 * ADMINS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

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
  		},
      toJSON: function () {
        var user = this.toObject();
        delete user.PASSWORD;
        delete user.NAME;
        return user;
      },
      auth: function(password, callback){
        var obj = this.toObject();
        // Hash password
        bcrypt.compare(password, obj.PASSWORD, function(err, pass) {
          if(pass){
            callback(true);
          }
          else
          {
            callback(false);
          }
        });
      }
  	},
    beforeCreate: function (values, cb) {
      // Hash password
      bcrypt.hash(values.PASSWORD, 10, function(err, hash) {
        if(err) return cb(err);
        values.PASSWORD = hash;
        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
      });
    },
    beforeUpdate: function (values, cb) {
      // Hash password
      bcrypt.hash(values.PASSWORD, 10, function(err, hash) {
        if(err) return cb(err);
        values.PASSWORD = hash;
        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
      });
    },
  	autoPK: false,
    tableName: 'ADMINS'
};

