const fs = require('fs');
const path = require('path');
const parentArrays = ['/', '/../', '/../../', '/../../../', '/../../../../', '/../../../../../', '/../../../../../../', '/../../../../../../../', '/../../../../../../../../', '/../../../../../../../../../../', '/../../../../../../../../../../'];

module.exports = {

	findFile: (fileName, z = 0, exclude = ['Dockerfile', 'Jenkinsfile', 'LICENSE']) => {
		let initPath = path.resolve(process.cwd() + parentArrays[z]);
		let fileArray = [];
		const check = a => {
			let pathArray = a.split('\\');
			(a.indexOf('.') == -1 && exclude.indexOf(pathArray[pathArray.length - 1]) == -1) ? fs.readdirSync(a).forEach(b => { check(`${a}\\${b}`) }) : ((a.indexOf(fileName) > 0 ? fileArray.push(a) : false))
		};
		fs.readdirSync(initPath).forEach(a => check(`${initPath}\\${a}`));
		return (fileArray.length > 1 ? new Error(`You have duplicate file names in your folder structure. Rename your duplicate file. \n ${fileArray}`) : ((fileArray[0] != null) ? fileArray[0] : 'File Not Found'))
	},
	globalFindFile: (z = 0) => {
		let initPath = path.resolve(process.cwd() + parentArrays[z]);
		return global.__find = (fileName, exclude = ['Dockerfile', 'Jenkinsfile', 'LICENSE']) => {
			let fileArray = [];
			const check = a => {
				let pathArray = a.split('\\');
				(a.indexOf('.') == -1 && exclude.indexOf(pathArray[pathArray.length - 1]) == -1) ? fs.readdirSync(a).forEach(b => { check(`${a}\\${b}`) }) : ((a.indexOf(fileName) > 0 ? fileArray.push(a) : false))
			};
			fs.readdirSync(initPath).forEach(a => check(`${initPath}\\${a}`));
			return (fileArray.length > 1 ? new Error(`You have duplicate file names in your folder structure. Rename your duplicate file. \n ${fileArray}`) : ((fileArray[0] != null) ? fileArray[0] : 'File Not Found'))
		};
	}
};
