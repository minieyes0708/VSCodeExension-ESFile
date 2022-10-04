import * as fs from 'fs';
import * as Utils from './Utils';
import * as ESFile from './ESFile';
import { window, workspace, Uri } from 'vscode';

async function selectBookmark(bookmarksPath: Uri) {
    const content = await Utils.readFile(bookmarksPath.fsPath);
    const bookmarks = content.toString().split('\n').map(bookmark => bookmark.trim());
    const result = await window.showQuickPick(bookmarks.filter(bookmark => bookmark !== ''), {
        placeHolder: 'Select Bookmark',
    });
    return result;
}

function getBookmarksPath(storageUri: Uri) {
    if (!fs.existsSync(storageUri.fsPath)) {
        fs.mkdirSync(storageUri.fsPath);
    }
    const bookmarksPath = Uri.parse('file:///' + storageUri.fsPath + '/bookmarks.txt');
    if (!fs.existsSync(bookmarksPath.fsPath)) {
        fs.writeFileSync(bookmarksPath.fsPath, '');
    }
    return bookmarksPath;
}

export async function edit(storageUri: Uri) {
    const bookmarksPath = getBookmarksPath(storageUri);
    workspace.openTextDocument(bookmarksPath).then(doc => {
        window.showTextDocument(doc);
    });
}

export async function openFile(storageUri: Uri) {
    const bookmarksPath = getBookmarksPath(storageUri);
    const bookmark = await selectBookmark(bookmarksPath);
    if (!bookmark) { return; }
    const file = await ESFile.pickFile('', bookmark);
    if (!file) { return; }
    const fileUri = Uri.parse('file:///' + file?.trim());
    workspace.openTextDocument(fileUri).then(doc => {
        window.showTextDocument(doc);
    });
}