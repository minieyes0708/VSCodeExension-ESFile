import * as Utils from './Utils';
import * as ESFile from './ESFile';
import { window, workspace, Uri } from 'vscode';

async function selectBookmark() {
    const content = await Utils.readFile('C:/Users/chenv/.vifm/user/bookmarks.txt');
    const bookmarks = content.toString().split('\n').map(bookmark => bookmark.trim());
    const result = await window.showQuickPick(bookmarks.filter(bookmark => bookmark !== ''), {
        placeHolder: 'Select Bookmark',
    });
    return result;
}

export async function edit() {
    const file = 'C:/Users/chenv/.vifm/user/bookmarks.txt';
    const fileUri = Uri.parse('file:///' + file?.trim());
    workspace.openTextDocument(fileUri).then(doc => {
        window.showTextDocument(doc);
    });
}

export async function openFile() {
    const bookmark = await selectBookmark();
    const file = await ESFile.pickFile(bookmark);
    const fileUri = Uri.parse('file:///' + file?.trim());
    workspace.openTextDocument(fileUri).then(doc => {
        window.showTextDocument(doc);
    });
}