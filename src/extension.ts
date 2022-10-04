import * as vscode from 'vscode';
import * as esFile from './ESFile';
import * as bookmarks from './Bookmarks';

export function activate(context: vscode.ExtensionContext) {
    const esfileOpenFileDisposable = vscode.commands.registerCommand('minieyes.esfile.openfile', () => {
        esFile.openFile();
    });
    const bookmarksOpenFileDisposable = vscode.commands.registerCommand('minieyes.bookmarks.openfile', () => {
        bookmarks.openFile();
    });
    const bookmarksEditBookmarksDisposable = vscode.commands.registerCommand('minieyes.bookmarks.edit', () => {
        bookmarks.edit();
    });

    context.subscriptions.push(esfileOpenFileDisposable);
    context.subscriptions.push(bookmarksOpenFileDisposable);
}

export function deactivate() { }