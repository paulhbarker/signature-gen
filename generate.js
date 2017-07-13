/**
 * Email signature generator for Marshall Stearns, Luxe Industries, RealtyFlux.
 * Edit template folder and destination, then run `node generate` or `npm start`.
 */
const colors = require('colors');
const fs = require('fs');
const minify = require('html-minifier').minify;
const Mustache = require('mustache');
const path = require('path');
const snake = require('to-snake-case');

/**
 * Specify template folder location
 * and output file destination
 */
let folder = 'cbtnuggets';
const dest = path.join(__dirname, folder);

const template = path.join(__dirname, folder, 'index.html');
const employee = {};
const answers = [];

const prompts = [
	'Full Name:',
	'Title:',
	'Email:',
	'Phone:',
];

const minifyOptions = {
	collapseWhitespace: true,
	minifyCSS: true,
	removeComments: true,
	removeEmptyElements: true,
	removeEmptyAttributes: true
};

const ask = (i) =>  {
	process.stdout.write(`${prompts[i]} `);
};

process.stdin.on('data', (data) => {

	answers.push(data.toString().trim());

	if ( answers.length < prompts.length ) {
		ask(answers.length);
	} else {

		employee.name = answers[0];
		employee.title = answers[1];
		employee.email = answers[2];
		employee.phone = answers[3];

		fs.readFile(template, 'utf8', (err, data) => {
			if (err) throw err;

			const html = Mustache.render(data, employee);
			const output = minify(html, minifyOptions);

			console.log(`Generating email signature in: ${dest}/`);

			fs.writeFile(path.join(dest, snake(employee.name) + '.html'), output, 'utf-8', (err) => {
				if (err) throw err;

				console.log('Successfully generated signature.'.green);
				process.exit();
			});
		});
	}
});

console.log('Please provide employee information.');

ask(0);