// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const extensions = require('./extensions.json');
// const fs = require('fs');
// const path = require('path');
// const unzipper = require('unzipper');
// const https = require('https');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    const installExtensionCommand = 'workbench.extensions.installExtension';
	console.log(extensions)
	for(const ext of extensions ){
		if (vscode.extensions.getExtension(ext) == undefined) {

			vscode.commands.executeCommand(installExtensionCommand, ext).then(
				() => {
					console.log(`Extension ${ext} installed successfully.`);
					vscode.window.showInformationMessage(`Extension ${ext} installed successfully.`);
				},
				(error) => {
					console.error(`Failed to install extension ${ext}:`, error);
				}
			);
		} else {
			console.log(`Extension ${ext} is already installed.`);
			vscode.window.showInformationMessage(`Extension ${ext} is already installed.`);
		}
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}