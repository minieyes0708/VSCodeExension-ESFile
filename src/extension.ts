import * as vscode from 'vscode';
import * as esFile from './ESFile';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('minieyes.esfiles.openfile', () => {
        esFile.openFile();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }