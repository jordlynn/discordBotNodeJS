var fIO = require("fs")
const spawn = require("child_process").spawn;


class CodeRunner {
	constructor(){

	}

	runPython(code) {
		var response = ""
		console.log("trans: " + code);
		fIO.writeFile("tmp.py", 'import sys\n', function(err, fd){
			if(err) {
				return console.error(err);
			}
			fIO.writeFile('tmp.py', code, {'flag':'a'}, function(err, fd){
				if(err) {
					return console.error(err);
				}
				fIO.writeFile('tmp.py', '\nsys.stdout.flush()', {'flag':'a'}, function(err, fd){
					if(err) {
						return console.error(err);
					}
				});
			});
		});

		return spawn('python', ["tmp.py"]);
	}
};

module.exports = CodeRunner;
