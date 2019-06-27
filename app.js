const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const airLogger = require('airfluencers-logger');
const directoryPath = path.join('teste_bruno');
const forbidenFiles = ['.DS_Store'];
let log = new airLogger();

const saveImage = (name, buffer) => {
	fs.createWriteStream(name).write(buffer);
}

const treatImage = (folder, file) => {
	console.log("entrou", `${folder}/${file}`,);
	let image = sharp(`${folder}/${file}`);
	image.metadata().then(function(info) {
		if (process.env.LANDSCAPE) {
			if(info.width < info.height){
				image.rotate(90).toFile(`./resolved-imgs/${file}`, (err, info) => {
					if (err) {
						console.log(err);
					}
					console.log(info);
				});
			} else {
				image.toFile(`./resolved-imgs/${file}`, (err, info) => {
					if (err) {
						console.log(err);
					}
					console.log(info);
				})
			}
		} else {
			if(info.width > info.height){
				image.rotate(90).toFile(`./resolved-imgs/${file}`, (err, info) => {
					if (err) {
						console.log(err);
					}
					console.log(info);
				});
			} else {
				image.toFile(`./resolved-imgs/${file}`, (err, info) => {
					if (err) {
						console.log(err);
					}
					console.log(info);
				})
			}
		}
	}).then(function(data) {
		// data contains a WebP image half the width and height of the original JPEG
	});
	// console.log(sharp('./imgs/test.jpg'));
	// sharp(`${folder}/${file}`).rotate(90).toBuffer((err, outputBuffer, info) => {
	// 	if(err){
	// 		log.err(err);
	// 		return false;
	// 	}
	// 	log.info(outputBuffer, info);
	// 	if(info.width > info.height){
	// 		saveImage(`./resolved-imgs/${file}`, outputBuffer);
	// 	} else {

	// 	}
	// });
}

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
    	if (forbidenFiles.indexOf(file) < 0) {
	        // Do whatever you want to do with the file
	        treatImage(directoryPath, file) 
    	}
    });
});