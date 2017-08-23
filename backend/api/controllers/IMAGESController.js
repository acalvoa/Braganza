/**
 * IMAGESController
 *
 * @description :: Server-side logic for managing IMAGES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req,res){
		try{
			req.file('IMAGE').upload({
			    // don't allow the total upload size to exceed ~10MB
			    // maxBytes: 10000000
			  },function whenDone(err, uploadedFiles) {
			    if (err) {
			      return res.negotiate(err);
			    }

			    // If no files were uploaded, respond with an error.
			    if (uploadedFiles.length === 0){
			      return res.badRequest('No file was uploaded');
			    }

			    for(i=0;i<uploadedFiles.length;i++){
			    	var ss = uploadedFiles[i];
			    	fs = require('fs')
					fs.open(uploadedFiles[i].fd, 'r', function(status, fd) {
					    if (status) {
					        sails.log.debug(status.message);
					        return;
					    }
					    var buffer = new Buffer(ss.size);
					    fs.read(fd, buffer, 0, ss.size, 0, function(err, num) {
					        try{
						        IMAGES.create({
									MIME: ss.type,
									NAME: ss.filename,
							  		SIZE: ss.size,
							  		DATA: buffer
								}).exec(function(err,photo){
									try{
										if(err) res.serverError();
										fs.unlinkSync(ss.fd)
										return res.json({
											RESPONSE:200,
											IMAGE: {
												ID_IMAGE: photo.ID_IMAGE,
												NAME: photo.NAME,
												SIZE: photo.SIZE,
												MIME: photo.MIME
											}
										});
									} catch(err) {
										return res.json({
											RESPONSE:500,
											ERROR: err
										});
									}
								});	
							} catch(err) {
								return res.json({
									RESPONSE:500,
									ERROR: err
								});
							}
					    });
					});
			    }
			});
		} catch(err) {
			return res.json({
				RESPONSE:500,
				ERROR: err
			});
		}
	},
	list: function(req,res){
		IMAGE_LIST.find().exec(function(err,value){
			return res.json({
				RESPONSE:200,
				IMAGES:value
			});
		})
	},
	getImage: function(req,res){
		var image = req.param('IMAGE');
		try{
			IMAGES.findOne({
				ID_IMAGE: image
			}).exec(function(err,image){
				try{
					if(err) return res.serverError({
						RESPONSE: 500
					});
					if(image){
						res.set("Content-type", image.MIME);
						res.header("Cache-Control", 'max-age=31536000');
						res.header('Expires', '31 Dic 2017 00:00:00 GMT');
						return res.send(image.DATA);
					}
					else
					{
						return res.notFound({
							RESPONSE:404
						});
					}
					
				} catch(err) {
					return res.json({
						RESPONSE:500,
						ERROR: err
					});
				}
			});
		} catch(err) {
				return res.json({
				RESPONSE:500,
				ERROR: err
			});
		}
	},

};

