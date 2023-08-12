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
    context.subscriptions.push(vscode.commands.registerCommand('minieyes.edit.todo', () => {
        utils.openFile('C:/Users/USER/OneDrive/文件/dendron/notes/TODO.md');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('minieyes.edit.programs', () => {
        utils.openFile('C:/Users/USER/OneDrive/文件/.config/programs.txt');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('minieyes.edit.bookmarks', () => {
        utils.openFile('C:/Users/USER/OneDrive/文件/.config/bookmarks.txt');
    }));
}

export function deactivate() { }