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
      NAME: {
        type: 'string'
      },
      LASTNAME:{
        type: 'string'
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
  		},
      ORDERS:{
        collection: 'ORDERS',
        via: 'USER'
      },
      SUSCRIPTIONS:{
        collection: 'SUSCRIPTIONS',
        via: 'USER'
      },
      toJSON: function () {
        var user = this.toObject();
        delete user.PASSWORD;
        user.FULLNAME = user.NAME+" "+user.LASTNAME;
        delete user.NAME;
        delete user.LASTNAME;
        delete user.TOKEN;
        return user;
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
    tableName: 'USERS'
};

