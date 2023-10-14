import * as vscode from 'vscode';
import * as utils from './Utils';
import * as esFile from './ESFile';
import * as bookmarks from './Bookmarks';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('minieyes.esfile.openfile', () => {
        esFile.openFile();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('minieyes.bookmarks.openfile', () => {
        bookmarks.openFile();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('minieyes.edit.settings', () => {
        utils.selectItemFromFile('C:/Users/USER/.config/settings.txt').then((file: string | undefined) => {
            if (file) { utils.openFile(file); }
        });
    }));
}

export function deactivate() { }