const path = require('path');
var spawnSync = require('child_process').spawnSync

console.log('▶️  Starting development server...')

var FAILURE = 'failure'
var SUCCESS = 'success'

var error = spawnSync('npx --version', {shell: true})
	.stderr.toString()
	.trim()
if (error) {
	console.error(
		'🚨  npx is not available on this computer. Please install npm@5.2.0 or greater',
	)
	throw error
}

var styles = {
	// got these from playing around with what I found from:
	// https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
	// they're the best I could find that works well for light or dark terminals
	success: {open: '\u001b[32;1m', close: '\u001b[0m'},
	danger: {open: '\u001b[31;1m', close: '\u001b[0m'},
	info: {open: '\u001b[36;1m', close: '\u001b[0m'},
	subtitle: {open: '\u001b[2;1m', close: '\u001b[0m'},
}

function color(modifier, string) {
	return styles[modifier].open + string + styles[modifier].close
}

function run(command, options) {
	options = options || {}
	var result = spawnSync(command, {stdio: 'inherit', shell: true})

	console.log(color('subtitle', '          Running the following command: ' + command))

	if (result.status !== 0 && !options.ignoreFailure) {
		console.error(
			color(
				'danger',
				'    🚨  Failure: ' +
				'. Please review the messages above for information on how to troubleshoot and resolve this issue.',
			),
		)
		process.exit(result.status)
		return FAILURE
	}

	console.log(color('success', '    ✅  Success: ' + '\n\n'))
	return SUCCESS
}

run(`npx next ./src/domains/${process.env.DOMAIN}`)

/*
eslint
  no-var: "off",
  "vars-on-top": "off",
*/
