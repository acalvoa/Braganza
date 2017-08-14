/**
 * ADMINSController
 *
 * @description :: Server-side logic for managing ADMINS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	me: function(req,res){
		res.json({
			STATUS: 200,
			USER: {
				EMAIL: 'test'
				NAME: 'test',
				ROLES: [1,2,3,4,5]
			}
		});
	},
	login: function(req,res){

	},
	changePassword: function(req,res){

	}
};

