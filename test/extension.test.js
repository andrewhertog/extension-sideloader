// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const assert = require('assert');
const sinon = require('sinon');
const myExtension = require('../extension');
const extensions = require('../extensions.test.json');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');


	suite('Extension Test Suite', () => {
		vscode.window.showInformationMessage('Start all tests.');

		test('Activate function should install missing extensions', async () => {
			const context = { subscriptions: [] };
			const executeCommandStub = sinon.stub(vscode.commands, 'executeCommand').resolves();
			const getExtensionStub = sinon.stub(vscode.extensions, 'getExtension').returns(undefined);
			const showInformationMessageStub = sinon.stub(vscode.window, 'showInformationMessage');

			await myExtension.activate(context);

			assert.strictEqual(executeCommandStub.callCount, extensions.length);
			assert.strictEqual(showInformationMessageStub.callCount, extensions.length);

			executeCommandStub.restore();
			getExtensionStub.restore();
			showInformationMessageStub.restore();
		});

		test('Activate function should not reinstall already installed extensions', async () => {
			const context = { subscriptions: [] };
			const executeCommandStub = sinon.stub(vscode.commands, 'executeCommand').resolves();
			const getExtensionStub = sinon.stub(vscode.extensions, 'getExtension').returns({});
			const showInformationMessageStub = sinon.stub(vscode.window, 'showInformationMessage');

			await myExtension.activate(context);

			assert.strictEqual(executeCommandStub.callCount, 0);
			assert.strictEqual(showInformationMessageStub.callCount, extensions.length);

			executeCommandStub.restore();
			getExtensionStub.restore();
			showInformationMessageStub.restore();
		});
	});
});
