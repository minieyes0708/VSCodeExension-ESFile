import * as fs from 'fs';
import * as Utils from './Utils';
import * as ESFile from './ESFile';
import { window, workspace, Uri } from 'vscode';

async function selectBookmark(bookmarks: Array<string>) {
    const result = await window.showQuickPick(bookmarks.filter(bookmark => bookmark !== ''), {
        placeHolder: 'Select Bookmark',
    });
    return result;
}

function getBookmarks() {
    return workspace.getConfiguration("minieyes.bookmarks").map(b => b.trim());
}

export async function openFile() {
    const bookmark = await selectBookmark(getBookmarks());
    if (!bookmark) { return; }
    const file = await ESFile.pickFile('', bookmark);
    if (!file) { return; }
    const fileUri = Uri.parse('file:///' + file?.trim());
    workspace.openTextDocument(fileUri).then(doc => {
        window.showTextDocument(doc);
    });
}